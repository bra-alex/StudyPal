//
//  SignUpForm.swift
//  StudyPal SwiftUI
//
//  Created by Don Bouncy on 02/01/2023.
//

import SwiftUI

struct SignUpForm: View {
    @Environment(\.dismiss) var dismiss
    
    @ObservedObject var authController: AuthController
    @FocusState var focusedField: FormFields?
    
    var body: some View {
        VStack(alignment: .leading, spacing: 15.0) {
            VStack(alignment: .leading) {
                Text("Sign Up")
                    .font(.largeTitle)
                    .fontWeight(.heavy)
                    .foregroundColor(.black)
                    .padding(.vertical)
                
                Text("Sign up with")
                    .font(.headline)
                    .foregroundColor(Color.black)
                    .padding(.bottom)
                
                HStack(alignment: .center, spacing: 20.0){
                    SocialLogo(login: "google")
                    SocialLogo(login: "apple")
                }
            }
            .padding(.all)
            
            Form {
                VStack(alignment: .center, spacing: 30) {
                    VStack(alignment: .leading, spacing: 10.0) {
                        Label(label: "Name")
                        RegisterTextFields(field: $authController.name, placeholder: "Full Name", prompt: authController.nameValid)
                            .textInputAutocapitalization(.words)
                            .submitLabel(.next)
                            .focused($focusedField, equals: .name)
                        
                        Label(label: "Email")
                        RegisterTextFields(field: $authController.email, placeholder: "example@example.com", prompt: authController.emailValid)
                            .textInputAutocapitalization(.never)
                            .keyboardType(.emailAddress)
                            .submitLabel(.next)
                            .focused($focusedField, equals: .email)
                        
                        Label(label: "Password")
                        RegisterTextFields(field: $authController.password, isSecure: true, placeholder: "8+ Characters, 1 Capital Letter", prompt: authController.passwordValid)
                            .keyboardType(.alphabet)
                            .focused($focusedField, equals: .password)
                            .submitLabel(.done)
                    }
                    .padding(.horizontal)
                    
                    Button {
                        authController.register()
                    } label: {
                        Text("Sign up")
                            .foregroundColor(.white)
                            .fontWeight(.bold)
                            .padding()
                            .frame(maxWidth: 300)
                            .background(Color("BasicColor"))
                            .cornerRadius(25)
                    }
                    .opacity(authController.isSignUpComplete ? 1 : 0.5)
                    .disabled(!authController.isSignUpComplete)
                    .alert(isPresented: $authController.isUnsuccessful){
                        Alert(title: Text("Error"), message: Text(authController.errors), dismissButton: .cancel(Text("Okay")))
                    }
                    .fullScreenCover(isPresented: $authController.isSuccessful) {
                        ExtraInfoView(authController: authController)
                    }
                    
                    HStack{
                        Text("Already have an account?")
                            .foregroundColor(.black.opacity(0.6))
                        Button {
                            dismiss()
                        } label: {
                            Text("Sign In")
                                .foregroundColor(Color("BasicColor"))
                        }
                    }
                }
                .onSubmit {
                    if focusedField == .name {
                        focusedField = .email
                    } else if focusedField == .email {
                        focusedField = .password
                    } else if focusedField == .password {
                        focusedField = nil
                    }
                }
                Spacer()
            }
            .formStyle(.columns)
        }
    }
}

struct SignUpForm_Previews: PreviewProvider {
    static var previews: some View {
        SignUpForm(authController: AuthController())
    }
}
