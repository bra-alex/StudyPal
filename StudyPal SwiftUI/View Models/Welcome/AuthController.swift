//
//  SignUpViewModel.swift
//  StudyPal SwiftUI
//
//  Created by Don Bouncy on 19/07/2022.
//

import Foundation
import FirebaseAuth
import FirebaseFirestore

class AuthController: ObservableObject{
    @Published var name = ""
    @Published var email = ""
    @Published var errors = ""
    @Published var username = ""
    @Published var password = ""
    @Published var isSuccessful = false
    @Published var isUnsuccessful = false
    @Published var showLoggedIn = false
    
    //MARK: - Auth Functions
    
    func isLoggedIn(){
        let loggedIn = FirebaseManager.shared.auth.currentUser?.uid
        if loggedIn == nil{
            showLoggedIn = true
        }
    }
    
    func register(){
        FirebaseManager.shared.auth.createUser(withEmail: email, password: password) { authResult, error in
            if let err = error{
                self.isUnsuccessful.toggle()
                self.errors = err.localizedDescription
            }else{
                self.isSuccessful.toggle()
            }
        }
    }
    
    func persistImageToStorage(_ image: UIImage?){
        guard let uid = FirebaseManager.shared.auth.currentUser?.uid else { return }
        
        let ref = FirebaseManager.shared.storage.reference(withPath: uid)
        
        guard let imageData = image?.jpegData(compressionQuality: 0.5) else { return }
        
        ref.putData(imageData) { metadata, error in
            if error != nil{
                print(error!.localizedDescription)
            }
            
            ref.downloadURL { url, error in
                if error != nil{
                    print("Could not retrieve url")
                    return
                }
                guard let url = url else { return }
                
                self.storeUserInfo(url: url)
            }
        }
    }
    
    func storeUserInfo(url: URL){
        
        guard let uid = FirebaseManager.shared.auth.currentUser?.uid else { return }
        
        let dbInfo = ["uid": uid, "name": name, "username": username, "email": email, "profileImageUrl": url.absoluteString]
        
        FirebaseManager.shared.firestore
            .collection("topics")
            .document("General")
            .updateData([
                "uid": FieldValue.arrayUnion([uid])
            ])
        
        FirebaseManager.shared.firestore
            .collection("users")
            .document(uid)
            .setData(dbInfo) { error in
            if let error = error{
                print(error.localizedDescription)
                return
            }else {
                self.isSuccessful.toggle()
            }
        }
    }
    
    func login(){
        FirebaseManager.shared.auth.signIn(withEmail: email, password: password) { authResult, error in
            if error != nil{
                self.isUnsuccessful.toggle()
            } else {
                self.isSuccessful.toggle()
                
            }
        }
    }
    
    func signOut(){
       do{
           try FirebaseManager.shared.auth.signOut()
           self.showLoggedIn = true
       } catch let signOutError as NSError {
           print("Error signing out: %@", signOutError)
       }
   }
    
    //MARK: - Validation
    func isNameValid() -> Bool {
        // criteria in regex. See http://regexlib.com
        let nameTest = NSPredicate (format: "SELF MATCHES %@", "^[a-zA-Z]+(([\\'\\,\\.\\- ][a-zA-Z ])?[a-zA-Z]*)*$")
        return nameTest.evaluate (with: name)
    }
    
    func isUsernameValid() -> Bool {
        // criteria in regex. See http://regexlib.com
        let usernameTest = NSPredicate (format: "SELF MATCHES %@", "^(?![-_.0-9])(?!.*[-_.][-_.])(?!.*[-_.]$)[A-Za-z0-9-_.]+$")
        return usernameTest.evaluate (with: username)
    }
    
    func isEmailValid() -> Bool {
        // criteria in regex. See http://regexlib.com
        let emailTest = NSPredicate (format: "SELF MATCHES %@", "^([a-zA-Z0-9_\\-\\.]+)@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.)|(([a-zA-Z0-9\\-]+\\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\\]?)$")
        return emailTest.evaluate (with: email)
    }
    
    func isPasswordValid() -> Bool {
        // criteria in regex. See http://regexlib.com
        let passwordTest = NSPredicate (format: "SELF MATCHES %@", "(?=^.{6,255}$)((?=.*\\d)(?=.*[A-Z])(?=.*[a-z])|(?=.*\\d)(?=.*[^A-Za-z0-9])(?=.*[a-z])|(?=.*[^A-Za-z0-9])(?=.*[A-Z])(?=.*[a-z])|(?=.*\\d)(?=.*[A-Z])(?=.*[^A-Za-z0-9]))^.*")
        return passwordTest.evaluate (with: password)
    }
    
    var isSignUpComplete: Bool{
        if !isNameValid() || !isEmailValid() || !isPasswordValid(){
            return false
        } else {
            return true
        }
        
    }
    
    //MARK: - Prompt
    
    var nameValid: String{
        if isNameValid(){
            return ""
        } else {
            return "Please enter a valid name"
        }
    }
    
    var usernameValid: String{
        if isUsernameValid(){
            return ""
        } else {
            return "Username must not end with a special character or have two special characters side by side"
        }
    }
    
    var emailValid: String{
        if isEmailValid(){
            return ""
        } else {
            return "Please enter a valid email"
        }
    }
    
    var passwordValid: String{
        if isPasswordValid(){
            return ""
        } else {
            return "8+ Characters, 1 Capital Letter"
        }
    }
}
