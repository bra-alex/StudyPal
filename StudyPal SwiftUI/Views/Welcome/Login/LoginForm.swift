//
//  LoginForm.swift
//  StudyPal SwiftUI
//
//  Created by Don Bouncy on 02/01/2023.
//

import SwiftUI

struct LoginForm: View {
    @FocusState var focusedField: FormFields?
    
    @ObservedObject var authController: AuthController
    
    @State private var remember = false
    
    var body: some View {
        VStack(alignment: .center, spacing: 40) {
            Image(systemName: "person")
                .resizable()
                .aspectRatio(contentMode: .fit)
                .frame(width: 100.0, height: 100.0)
                .padding(.all, 25.0)
                .background(Color(red: 0.373, green: 0.377, blue: 0.377, opacity: 0.2))
                .cornerRadius(100)
                .foregroundColor(.white)
            
            
            VStack {
                Text(authController.isUnsuccessful ? "Username or password invalid" : "")
                    .frame(maxWidth: 280.0)
                    .fixedSize(horizontal: false, vertical: true)
                    .font(.caption)
                    .padding(.vertical, 4.0)
                    .foregroundColor(.red)
                
                LoginTextFields(text: $authController.email, title: "Email", imgName: "person.fill", color: .white, txtColor: .white)
                    .focused($focusedField, equals: .email)
                    .autocorrectionDisabled()
                    .textInputAutocapitalization(.never)
                    .keyboardType(.emailAddress)
                    .submitLabel(.next)
                    .onAppear{
                        DispatchQueue.main.asyncAfter(deadline: .now() + 0.75){
                            self.focusedField = .email
                        }
                    }
                
                LoginTextFields(text: $authController.password, title: "Password", imgName: "lock.fill", isSecure: true, color: .white, txtColor: .white)
                    .padding(.top)
                    .autocorrectionDisabled()
                    .textInputAutocapitalization(.never)
                    .keyboardType(.alphabet)
                    .focused($focusedField, equals: .password)
                    .submitLabel(.done)
            }
            
            HStack(alignment: .center){
                Text("Forgot Password?")
                    .foregroundColor(.white)
                    .italic()
            }
            
            Button {
                if !authController.password.isEmpty && !authController.email.isEmpty{
                    authController.login()
                } else if !authController.email.isEmpty{
                    focusedField = .password
                }else if !authController.password.isEmpty{
                    focusedField = .username
                } else {
                    focusedField = nil
                }
            } label: {
                Text("Login")
                    .foregroundColor(.white)
                    .fontWeight(.bold)
                    .padding()
                    .frame(maxWidth: 300)
                    .background(LinearGradient(colors: [Color(red: 0.71, green: 0.35, blue: 0.72, opacity: 0.7), Color(red: 0.49, green: 0.35, blue: 0.75, opacity: 0.6), Color(red: 0.29, green: 0.35, blue: 0.77, opacity: 0.3)], startPoint: .bottomTrailing, endPoint: .topLeading))
                    .cornerRadius(25)
            }
            
            HStack{
                Text("Don't have an account?")
                    .foregroundColor(.white)
                NavigationLink(destination: RegisterScreenView(authController: authController).navigationBarHidden(true)) {
                    Text("Sign Up")
                        .foregroundColor(Color("BasicColor"))
                }
            }
        }
        .onSubmit {
            if focusedField == .email {
                focusedField = .password
            } else if focusedField == .password {
                focusedField = nil
            }
        }
    }
    

}

struct LoginForm_Previews: PreviewProvider {
    static var previews: some View {
        ZStack {
            Image("LoginBgImage")
                .resizable()
                .ignoresSafeArea()
            
            LoginForm(authController: AuthController())
        }
    }
}
