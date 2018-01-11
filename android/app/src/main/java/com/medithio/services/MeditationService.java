package com.medithio.services;

import android.app.IntentService;
import android.app.Notification;
import android.app.PendingIntent;
import android.content.Context;
import android.content.Intent;
import android.media.MediaPlayer;
import android.os.Bundle;
import android.support.annotation.NonNull;
import android.support.annotation.Nullable;
import android.support.v4.app.NotificationCompat;

import com.medithio.MainActivity;
import com.medithio.R;
import com.medithio.models.Meditation;
import com.medithio.modules.MeditationServiceModule;
import com.medithio.packages.MedithioReactPackage;

import java.io.IOException;
import java.util.Locale;
import java.util.concurrent.atomic.AtomicBoolean;


public class MeditationService extends IntentService {
    private static final String ARG_MEDITATION = "meditation";
    private static final int TICK_MILISEC = 1000;
    private static final int NOTIFICATION_ID = "notifId".hashCode();

    private static AtomicBoolean stopped = new AtomicBoolean(false);
    private static Meditation currentMeditation = null;

    public static void startMeditationService(
            @NonNull final Meditation meditation,
            @NonNull final Context c) throws MeditationRunningException {

        if (running()) throw new MeditationRunningException();

        final Bundle args = new Bundle();
        args.putSerializable(ARG_MEDITATION, meditation);

        final Intent i = new Intent(c, MeditationService.class);
        i.putExtras(args);
        c.startService(i);
    }

    public MeditationService() {
        super("MeditationService");
    }

    public static void stop() {
        stopped.set(true);
    }

    public static boolean running() {
        return getCurrentMeditation() != null && !getCurrentMeditation().ended;
    }

    @Override
    protected void onHandleIntent(@Nullable Intent intent) {
        Meditation meditation = (Meditation) intent.getSerializableExtra(ARG_MEDITATION);
        final MediaPlayer mp = MediaPlayer.create(this, R.raw.meditation_sound);

        if (meditation == null)
            throw new IllegalStateException("Service must be started by MeditationService.startMeditationService()");

        stopped.set(false);
        setCurrentMeditation(meditation);

        this.playSound(mp);

        this.displayNotification(meditation.leftMillisec() / 1000);

        while (!stopped.get()) {
            final long secondsLeft = meditation.leftMillisec() / 1000;
            this.displayNotification(secondsLeft);

            if (secondsLeft < 0) break;
            this.sleepTick();
        }

        this.removeNotification();

        final boolean completed = !stopped.get();
        meditation = meditation.cloneEnded(completed);
        setCurrentMeditation(meditation);

        if (completed) {
            this.playSound(mp);
        }
    }

    private void displayNotification(final long secondsLeft) {
        final String formattedTimeLeft = String.format(
                Locale.getDefault(),
                "%d:%2d",
                secondsLeft / 60,
                secondsLeft % 60
        );

        PendingIntent openAppPendingIntent = PendingIntent.getActivity(
                this,
                0,
                new Intent(this, MainActivity.class),
                PendingIntent.FLAG_UPDATE_CURRENT
        );

        NotificationCompat.Builder nBuilder = new NotificationCompat.Builder(this)
                .setSmallIcon(R.drawable.app_icon)
                .setContentTitle("Meditace probíhá")
                .setContentText("Zbývá: " + formattedTimeLeft)
                .setContentIntent(openAppPendingIntent);

        Notification notification = nBuilder.build();

        this.startForeground(NOTIFICATION_ID, notification);

        //TODO properly release MediaPlayer
    }

    private void removeNotification() {
        this.stopForeground(true);
    }

    private void playSound(@NonNull final MediaPlayer mp) {
        mp.start();
    }

    public static synchronized void setCurrentMeditation(@NonNull final Meditation meditation) {
        currentMeditation = meditation;
        MeditationServiceModule.notifyStateChanged(meditation);
    }

    @Nullable
    public static synchronized Meditation getCurrentMeditation() {
        return currentMeditation;
    }

    private void sleepTick() {
        try {
            Thread.sleep(TICK_MILISEC);
        } catch (InterruptedException e) {
            e.printStackTrace(); //Should not happen
        }
    }

    public static class MeditationRunningException extends Exception {
    }
}
