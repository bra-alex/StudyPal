//
//  LoginDemo.swift
//  StudyPal SwiftUI
//
//  Created by Don Bouncy on 21/07/2022.
//

import SwiftUI
import FirebaseAuth

struct LoginDemo: View {
    @FocusState var focusedField: FormFields?
    @State private var email: String = ""
    @State private var password: String = ""
    @State private var isSuccessful: Bool = false
    @State private var isUnsuccessful: Bool = false
    @State private var errors = ""
    var body: some View {
        ZStack {
            Color(.black)
                .ignoresSafeArea()
            VStack {
                Text(isUnsuccessful ? "Username or password invalid" : "")
                    .frame(maxWidth: 280.0)
                    .fixedSize(horizontal: false, vertical: true)
                    .font(.caption)
                    .padding(.vertical, 4.0)
                    .foregroundColor(.red)
                
                LoginTextFields(text: $email, title: "Username", imgName: "person.fill", color: .white, txtColor: .white)
                    .focused($focusedField, equals: .username)
                    .autocorrectionDisabled()
                    .textInputAutocapitalization(.never)
                    .keyboardType(.emailAddress)
                    .submitLabel(.next)
                    .onAppear(){
                        DispatchQueue.main.asyncAfter(deadline: .now() + 0.75){
                            self.focusedField = .username
                        }
                }
                LoginTextFields(text: $password, title: "Password", imgName: "lock.fill", isSecure: true, color: .white, txtColor: .white)
                    .padding(.top)
                    .autocorrectionDisabled()
                    .textInputAutocapitalization(.never)
                    .keyboardType(.alphabet)
                    .focused($focusedField, equals: .password)
                    .submitLabel(.done)
                
                Button {
                    login()
                } label: {
                    Text("Login")
                        .foregroundColor(.white)
                        .fontWeight(.bold)
                        .padding()
                        .frame(maxWidth: 300)
                        .background(LinearGradient(colors: [Color(red: 0.71, green: 0.35, blue: 0.72, opacity: 0.7), Color(red: 0.49, green: 0.35, blue: 0.75, opacity: 0.6), Color(red: 0.29, green: 0.35, blue: 0.77, opacity: 0.3)], startPoint: .bottomTrailing, endPoint: .topLeading))
                        .cornerRadius(25)
                }
            }
        }
    }
    
    private func login(){
        Auth.auth().signIn(withEmail: email, password: password) { authResult, error in
            if error != nil{
                isUnsuccessful = true
                print(error!.localizedDescription)
            } else {
                isSuccessful.toggle()
                print("Login Pressed")
            }
        }
    }
}

struct LoginDemo_Previews: PreviewProvider {
    static var previews: some View {
        LoginDemo()
    }
}
