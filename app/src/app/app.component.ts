import { Component } from "@angular/core";
import { Platform, AlertController } from "ionic-angular";
import { StatusBar } from "@ionic-native/status-bar";
import { SplashScreen } from "@ionic-native/splash-screen";
import { Push, PushObject, PushOptions } from "@ionic-native/push";

import { HomePage } from "../pages/home/home";
@Component({
  templateUrl: "app.html",
})
export class MyApp {
  rootPage: any = HomePage;

  constructor(
    push: Push,
    alertCtrl: AlertController,
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen
  ) {
    platform.ready().then(() => {
      if (platform.is("cordova")) {
        statusBar.styleDefault();
        splashScreen.hide();

        const options: PushOptions = {
          android: {},
          ios: {
            alert: "true",
            badge: true,
            sound: "false",
          },
        };

        push.hasPermission().then((res: any) => {
          if (res.isEnabled) {
            alert("tem permissao");
          } else {
            alert("nao tem permissao");
          }
        });
        const pushObject: PushObject = push.init(options);
        pushObject.on("notification").subscribe((notification: any) => {
          console.log(notification);
          const alert = alertCtrl.create({
            title: notification.title,
            subTitle: notification.message,
            buttons: ["Ok"],
          });
          alert.present();
        });

        pushObject.on("registration").subscribe((registration: any) => {
          localStorage.setItem("token", registration.registrationId);
        });

        pushObject.on("error").subscribe((error) => {
          alert("deu erro");
          console.error("Error with Push plugin", error);
        });
      }
    });
  }
}
