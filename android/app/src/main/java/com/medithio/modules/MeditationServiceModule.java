package com.medithio.modules;

import android.support.annotation.NonNull;
import android.util.Log;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.medithio.models.Meditation;
import com.medithio.services.MeditationService;

import java.util.HashMap;
import java.util.Map;

import javax.annotation.Nullable;

public class MeditationServiceModule extends ReactContextBaseJavaModule {
    private static String STATE_CHANGED = "stateChanged";

    private static MeditationServiceModule instance = null;

    public MeditationServiceModule(ReactApplicationContext reactContext) {
        super(reactContext);
        instance = this;
    }

    @Override
    public String getName() {
        return "MeditationServiceModule";
    }

    @ReactMethod
    public void startMeditation(@NonNull final String startedAtTime, final int durationSec, Promise promise) {

        final Meditation meditation = new Meditation(Long.parseLong(startedAtTime), durationSec);

        try {
            MeditationService.startMeditationService(meditation, this.getReactApplicationContext().getApplicationContext());
        } catch (MeditationService.MeditationRunningException e) {
            Log.w("MeditationServiceModule", "Meditation already running");
        }

        promise.resolve(meditation.toWritableMap());
    }

    @ReactMethod
    public void stopMeditation() {
        MeditationService.stop();
    }

    @ReactMethod
    public void getCurrentMeditation(Promise promise) {
        final Meditation currentMeditation = MeditationService.getCurrentMeditation();
        promise.resolve(currentMeditation != null ? currentMeditation.toWritableMap() : null);
    }

    public static void notifyStateChanged(@NonNull final Meditation meditation) {
        if(instance == null) return;

        instance.getReactApplicationContext()
                .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit(STATE_CHANGED, meditation.toWritableMap());
    }


    @Nullable
    @Override
    public Map<String, Object> getConstants() {
        final Map<String, Object> map = new HashMap<>();

        map.put("EVENT_STATE_CHANGED", STATE_CHANGED);

        return map;
    }

    public synchronized void setInstance(MeditationServiceModule instance) {
        MeditationServiceModule.instance = instance;
    }

    public synchronized MeditationServiceModule getInstance() {
        return instance;
    }
}
