import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { AlertService } from './alert.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  web3Provider: any = null;

  onAccountChange$: ReplaySubject<string | null> = new ReplaySubject(1);

  _connectedAccount: string | null = null;
  set connectedAccount(account: string | null) {
    const changed = this._connectedAccount !== account;
    if (!changed) {
      return;
    }

    if (account) {
      sessionStorage.setItem("eth_conn", "1");
    } else {
      sessionStorage.removeItem("eth_conn");
    }

    this._connectedAccount = account;
    this.onAccountChange$.next(account);
  }

  get connectedAccount() {
    return this._connectedAccount;
  }

  constructor(
    private alert: AlertService
  ) { }

  handleError(err: string) {
    this.alert.error(err);
  }

  connectToMetaMask() {
    this.connectedAccount = null;

    let ethereum = (<any>window)['ethereum'];
    if (typeof ethereum !== 'undefined') {
      // MetaMask is installed!
      if (ethereum) {
        this.web3Provider = ethereum;

        try {
          // Request account access
          this.web3Provider.request({ method: 'eth_requestAccounts' }).then((accounts: any) => {
            this.connectedAccount = accounts[0];
          });

          this.web3Provider.on('accountsChanged', (accounts: any) => {
            this.connectedAccount = accounts[0];
            setTimeout(() => {
              window.location.reload();
            }, 100)
          });

          this.web3Provider.on('chainChanged', (chainId: any) => {
            console.log("cahinId = ", parseInt(chainId, 16));
          });
        } catch (error) {
          this.connectedAccount = null;
          this.handleError("Couldn't connect to MetaMask");
        }
        return;
      }

      this.handleError("Couldn't connect to MetaMask");
      return;
    }

    this.handleError("Please install MetaMask");
  }

  async signMessage(msg: string) {
    if (!msg) {
      return Promise.reject();
    }

    if (!(this.web3Provider && this.connectedAccount)) {
      this.alert.error("Couldn't sign message");
      return await Promise.reject();
    }

    return await this.web3Provider.request({
      method: 'personal_sign',
      params: [
        msg,
        this.connectedAccount
      ],
    });
  }

  disconnectFromMetaMask() {
    this.connectedAccount = null;
    this.web3Provider = null;
  }
}
