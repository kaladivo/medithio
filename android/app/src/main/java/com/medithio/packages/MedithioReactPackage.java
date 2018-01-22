package com.medithio.packages;

import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;
import com.medithio.modules.MeditationServiceModule;
import com.medithio.modules.NumberPickerDialogModule;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;


public class MedithioReactPackage implements ReactPackage{
    @Override
    public List<NativeModule> createNativeModules(ReactApplicationContext reactContext) {
        final List<NativeModule> list = new ArrayList<>();

        list.add(new MeditationServiceModule(reactContext));
        list.add(new NumberPickerDialogModule(reactContext));

        return list;
    }

    @Override
    public List<ViewManager> createViewManagers(ReactApplicationContext reactContext) {
        return Collections.emptyList();
    }
}
