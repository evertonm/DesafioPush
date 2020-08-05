import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController } from 'ionic-angular';
import { CourseProvider } from '../../providers/course/course';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public isRegister: boolean = false;
  constructor(
      public navCtrl: NavController,
      private courseProvider: CourseProvider,
      private loadingCtrl: LoadingController,
      private alertCtrl: AlertController
    )
  {
  }

  public async register() {
    const loading = this.loadingCtrl.create({
      content: 'Se inscrevendo no curso...'
    });
    loading.present();

    try {
      const token = await localStorage.getItem('token');
      await this.courseProvider.register(token);
      loading.dismiss();
      const alert = this.alertCtrl.create({
        title: 'Inscrição realizada',
        subTitle: 'Você se inscreveu no curso.',
        buttons: ['Ok']
      });
      alert.present();
      this.isRegister = true;
    } catch(err) {
      loading.dismiss();
      const alert = this.alertCtrl.create({
        title: 'Houve um problema',
        subTitle: 'Não foi possível se inscrever no curso. Tente novamente.',
        buttons: ['Ok']
      });
      alert.present();
    }
  }

  public async finish() {
    const loading = this.loadingCtrl.create({
      content: 'Concluindo curso...'
    });
    loading.present();

    try {

      const token = await localStorage.getItem('token');
      await this.courseProvider.finish(token);
      loading.dismiss();
      const alert = this.alertCtrl.create({
        title: 'Conclusão realizada',
        subTitle: 'Você concluiu o curso.',
        buttons: ['Ok']
      });
      alert.present();
      this.isRegister = false;
    } catch(err) {
      loading.dismiss();
      const alert = this.alertCtrl.create({
        title: 'Houve um problema',
        subTitle: 'Não foi possível concluir o curso. Tente novamente.',
        buttons: ['Ok']
      });
      alert.present();
    }
  }

}
