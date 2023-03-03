package com.reactnativerncustomerglu;
import android.app.Activity;

import com.customerglu.sdk.CustomerGlu;

public class CGUtils {

    public static void handleConfigurationChanges(Activity activity)
    {
        CustomerGlu.getInstance().handleConfigurationChanges(activity);
    }
    
}
