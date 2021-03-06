import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import * as firebase from 'firebase';

@Injectable()
export class UserService {

    readUser():any{
        var userId = firebase.auth().currentUser.uid;
        //console.log("userid:",userId);
        return firebase.database().ref('/users/' + userId).once('value').then(function(snapshot) {
            var user = snapshot.val();
            console.log("users:",user);
            return {
                    uid: user.uid,
                    userName: user.userName,
                    userPicture: user.userPicture,
                    phone: user.phone,
                    email: user.email
            }
        });
    }
    getUser(uid:number){
        return firebase.database().ref('/users/' + uid).once('value').then(function(snapshot) {
            var user = snapshot.val();

            return {
                    userName: user.userName,
                    userPicture: user.userPicture,
                    email: user.email,
                    phone:user.phone
            }

        });
    }

    saveUser() {
        // A post entry.
        let userName = firebase.auth().currentUser.displayName;
        let uid = firebase.auth().currentUser.uid;
        let userPicture = firebase.auth().currentUser.photoURL;
        let email= firebase.auth().currentUser.email;

        var postData = {
            userName: userName,
            uid: uid,
            userPicture: userPicture,
            email: email,
            phone: '0755203356'
        };
        //
        // // Get a key for a new User.
        // var newUserKey = firebase.database().ref().child('users').push().key;

        // Write the new post's data simultaneously in the posts list and the user's post list.
        var updates = {};
        updates['/users/' + uid] = postData;

        return firebase.database().ref().update(updates);
    }
}
