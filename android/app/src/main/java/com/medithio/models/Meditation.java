package com.medithio.models;


import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.WritableMap;

import java.io.Serializable;
import java.util.Date;
import java.util.Locale;

public class Meditation implements Serializable{
    private static final String KEY_STARTED_AT_MILISEC = "startedAtMilisec";
    private static final String KEY_DURATION_SEC = "durationSec";
    private static final String KEY_COMPLETED = "completed";
    private static final String KEY_ENDED = "ended";

    public final Date startedAt;
    public final int durationSec;
    public final boolean ended;
    public final boolean completed;

    public Meditation(long startedAtTime, int durationSec) {
        this(startedAtTime, durationSec, false, false);
    }

    public Meditation(long startedAtTime, int durationSec, boolean ended, boolean completed) {
        this.durationSec = durationSec;
        this.completed = completed;
        this.ended = ended;

        final Date startedAtDate = new Date();
        startedAtDate.setTime(startedAtTime);
        this.startedAt = startedAtDate;
    }

    public long leftMillisec() {
        return (this.startedAt.getTime() + durationSec * 1000) - new Date().getTime();
    }

    public Meditation cloneEnded(final boolean completed) {
        return new Meditation(this.startedAt.getTime(), this.durationSec, true, completed);
    }

    public WritableMap toWritableMap() {
        final WritableMap wm = Arguments.createMap();

        wm.putInt(KEY_DURATION_SEC, this.durationSec);
        wm.putBoolean(KEY_COMPLETED, this.completed);
        wm.putBoolean(KEY_ENDED, this.ended);
        wm.putString(
                KEY_STARTED_AT_MILISEC,
                String.format(Locale.getDefault(), "%d", this.startedAt.getTime())
        );

        return wm;
    }

    @Override
    public String toString() {
        return "Meditation{" +
                "startedAt=" + startedAt +
                ", durationSec=" + durationSec +
                ", ended=" + ended +
                ", completed=" + completed +
                '}';
    }
}
