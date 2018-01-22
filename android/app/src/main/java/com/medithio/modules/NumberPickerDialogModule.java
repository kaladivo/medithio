package com.medithio.modules;

import android.content.DialogInterface;
import android.support.v7.app.AlertDialog;
import android.view.LayoutInflater;
import android.view.View;
import android.widget.SeekBar;
import android.widget.TextView;

import com.facebook.react.bridge.LifecycleEventListener;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.medithio.R;

import java.util.Locale;

public class NumberPickerDialogModule extends ReactContextBaseJavaModule {

    public NumberPickerDialogModule(ReactApplicationContext reactContext) {
        super(reactContext);

    }

    @Override
    public String getName() {
        return "NumberPickerDialogModule";
    }

    @ReactMethod
    public void show(
            final String beforeSelected,
            final String afterSelected,
            final String title,
            final String submitText,
            final String cancelText,
            final int max,
            final int min,
            final int defaultValue,
            final Promise promise) {

        final View dialogView = View.inflate(this.getCurrentActivity(), R.layout.number_picker_slider, null);

        AlertDialog.Builder builder = new AlertDialog.Builder(this.getCurrentActivity(), R.style.MyDialogTheme)
                .setView(dialogView);

        AlertDialog displayedAlertDialog = builder.create();

        final TextView pickedView = (TextView) dialogView.findViewById(R.id.picked);
        final TextView titleView = (TextView) dialogView.findViewById(R.id.title);
        final SeekBar seekBar = (SeekBar) dialogView.findViewById(R.id.seekBar);

        titleView.setText(title);
        seekBar.setMax(max - min);
        seekBar.setProgress(defaultValue - min);
        seekBar.setOnSeekBarChangeListener(new SeekBar.OnSeekBarChangeListener() {
            @Override
            public void onProgressChanged(SeekBar seekBar, int progress, boolean fromUser) {
                pickedView.setText(String.format(Locale.getDefault(), "%s%d%s", beforeSelected, progress+min, afterSelected));
            }

            @Override
            public void onStartTrackingTouch(SeekBar seekBar) {

            }

            @Override
            public void onStopTrackingTouch(SeekBar seekBar) {

            }
        });

        displayedAlertDialog.setButton(AlertDialog.BUTTON_POSITIVE, submitText, new DialogInterface.OnClickListener() {
            @Override
            public void onClick(DialogInterface dialog, int which) {
                final int progress = seekBar.getProgress();
                promise.resolve(progress + min);
            }
        });

        displayedAlertDialog.setButton(AlertDialog.BUTTON_NEGATIVE, cancelText, new DialogInterface.OnClickListener() {
            @Override
            public void onClick(DialogInterface dialog, int which) {
                promise.resolve(null);
            }
        });

        pickedView.setText(String.format(
                Locale.getDefault(),
                "%s%d%s",
                beforeSelected,
                seekBar.getProgress() + min,
                afterSelected
        ));

        displayedAlertDialog.show();
    }
}
