//
//  SignUpViewModel.swift
//  StudyPal SwiftUI
//
//  Created by Don Bouncy on 19/07/2022.
//

import Foundation

class SignUpViewModel: ObservableObject{
    @Published var name: String = ""
    @Published var username: String = ""
    @Published var email: String = ""
    @Published var password: String = ""
    
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
