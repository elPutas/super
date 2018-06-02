# super

Al compilar se debe cambiar dentre de platform -> android -> project.properties:

```
cordova.system.library.1=com.android.support:support-v4:+
```
por

```
cordova.system.library.1=com.android.support:support-v4:27.1.0
```
referencia:
```
https://forum.ionicframework.com/t/build-break-with-aapt-error-message-why/123955/6
```
