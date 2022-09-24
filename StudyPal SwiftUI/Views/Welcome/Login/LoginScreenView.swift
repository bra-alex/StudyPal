//
//  LoginScreenView.swift
//  StudyPal SwiftUI
//
//  Created by Don Bouncy on 18/07/2022.
//

import SwiftUI

struct LoginScreenView: View {
    @Environment(\.presentationMode) var presentationMode
    @FocusState var focusedField: FormFields?
    @GestureState private var dragOffset = CGSize.zero
    @State private var email: String = ""
    @State private var password: String = ""
    @State private var remember: Bool = false
    @State private var isUnsuccessful: Bool = false
    @State private var isSuccessful: Bool = false
    @State private var btnOpacity = 1.0
    
    var body: some View {
        if isSuccessful{
            withAnimation {
                HomeView()
            }
            
        } else {
            GeometryReader { _ in
                ZStack {
                    Image("LoginBgImage")
                        .resizable()
                        .ignoresSafeArea()
                    
                    VStack {
                        closeBtn
                        Spacer(minLength: 0)
                    }
                    
                    ScrollView {
                        Spacer()
                        loginForm
                            .onSubmit {
                                if focusedField == .email {
                                    focusedField = .password
                                } else if focusedField == .password {
                                    focusedField = nil
                                }
                            }
                    }
                }.onTapGesture {
                    hideKeyboard()
                }
                .gesture(DragGesture().updating($dragOffset, body: { (value, state, transaction) in
                    if(value.startLocation.x < 20 &&
                       value.translation.width > 100) {
                        self.presentationMode.wrappedValue.dismiss()
                    }
                })
                )
            }.ignoresSafeArea(.keyboard, edges: .all)
        }
    }
    
    private func login(){
        FirebaseManager.shared.auth.signIn(withEmail: email, password: password) { authResult, error in
            if error != nil{
                isUnsuccessful.toggle()
            } else {
                isSuccessful.toggle()
                UserViewModel().fetchCurrentUser()
                UserViewModel().fetchRecentMessages()
            }
        }
    }
}

struct LoginScreenView_Previews: PreviewProvider {
    static var previews: some View {
        LoginScreenView()
    }
}

//MARK: - Close Button

extension LoginScreenView {
    private var closeBtn: some View{
        HStack{
            CloseBtnView(color: .white)
                .onTapGesture {
                    withAnimation(.easeOut){
                        self.btnOpacity = 0.1
                    }
                    withAnimation(.easeIn){
                        self.btnOpacity = 1
                    }
                    DispatchQueue.main.asyncAfter(deadline: .now() + 0.1){
                        withAnimation {
                            presentationMode.wrappedValue.dismiss()
                        }
                    }
                }
            Spacer()
        }
    }
}

//MARK: - Log In Form

extension LoginScreenView {
    private var loginForm: some View {
        VStack(alignment: .center, spacing: 64.0) {
            Spacer()
            Image(systemName: "person")
                .resizable()
                .aspectRatio(contentMode: .fit)
                .frame(width: 100.0, height: 100.0)
                .padding(.all, 25.0)
                .background(Color(red: 0.373, green: 0.377, blue: 0.377, opacity: 0.2))
                .cornerRadius(100)
                .foregroundColor(.white)
            
            
            VStack {
                Text(isUnsuccessful ? "Username or password invalid" : "")
                    .frame(maxWidth: 280.0)
                    .fixedSize(horizontal: false, vertical: true)
                    .font(.caption)
                    .padding(.vertical, 4.0)
                    .foregroundColor(.red)
                
                LoginTextFields(text: $email, title: "Email", imgName: "person.fill")
                    .focused($focusedField, equals: .email)
                    .autocorrectionDisabled()
                    .textInputAutocapitalization(.never)
                    .keyboardType(.emailAddress)
                    .submitLabel(.next)
                    .onAppear(){
                        DispatchQueue.main.asyncAfter(deadline: .now() + 0.75){
                            self.focusedField = .email
                        }
                    }
                
                LoginTextFields(text: $password, title: "Password", imgName: "lock.fill", isSecure: true)
                    .padding(.top)
                    .autocorrectionDisabled()
                    .textInputAutocapitalization(.never)
                    .keyboardType(.alphabet)
                    .focused($focusedField, equals: .password)
                    .submitLabel(.done)
            }
            
            HStack(alignment: .center, spacing: 30.0){
                HStack(alignment: .center) {
                    Toggle("", isOn: $remember)
                        .toggleStyle(.checklist)
                    Text("Remember Me")
                        .foregroundColor(.white)
                }
                
                Text("Forgot Password?")
                    .foregroundColor(.white)
                    .italic()
            }
            
            Button {
                if !password.isEmpty && !email.isEmpty{
                    login()
                } else if !email.isEmpty{
                    focusedField = .password
                }else if !password.isEmpty{
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
                NavigationLink(destination: RegisterScreenView().navigationBarHidden(true)) {
                    Text("Sign Up")
                        .foregroundColor(Color("BasicColor"))
                }
            }
        }
        
    }
}

