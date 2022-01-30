import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  web3Provider: any = null;
  
  onAccountChange$: ReplaySubject<string | null> = new ReplaySubject(1);

  _connectedAccount: string | null = null;
  set connectedAccount(account: string | null) {
    const changed = this._connectedAccount !== account;
    if(!changed) {
      return;
    }

    this._connectedAccount = account;
    this.onAccountChange$.next(account);
  }

  get connectedAccount() {
    return this._connectedAccount;
  }

  constructor() { }

  handleError(err: string) {
    console.log("Error", err);
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
          this.web3Provider.request({ method: 'eth_requestAccounts' }).then((accounts:any) => {
            this.connectedAccount = accounts[0];
          });

          console.log("Chain = ", this.web3Provider.networkVersion)

          this.web3Provider.on('accountsChanged', (accounts: any) => {
            this.connectedAccount = accounts[0];
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

  disconnectFromMetaMask() {
    this.connectedAccount = null;
    this.web3Provider = null;
  }
}
