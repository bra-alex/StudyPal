//
//  RegisterScreenView.swift
//  StudyPal SwiftUI
//
//  Created by Don Bouncy on 18/07/2022.
//

import SwiftUI

enum FormFields: Hashable{
    case username, password, name, email
}

struct RegisterScreenView: View {
    @Environment(\.presentationMode) var presentationMode
    @ObservedObject var signUpVM = SignUpViewModel()
    @FocusState var focusedField: FormFields?
    @GestureState private var dragOffset = CGSize.zero
    @State private var isUnsuccessful: Bool = false
    @State private var isSuccessful: Bool = false
    @State private var btnOpacity = 1.0
    @State private var errors = ""
    
    
    var body: some View {
        
        ZStack {
            Image("RegisterBgImage")
                .resizable()
                .ignoresSafeArea()
            
            VStack {
                closeBtn
                Spacer(minLength: 0)
            }
            
            
            signUpForm
                .onSubmit {
                    if focusedField == .name {
                        focusedField = .email
                    } else if focusedField == .email {
                        focusedField = .password
                    } else if focusedField == .password {
                        focusedField = nil
                    }
                }
        }
        .onTapGesture {
            hideKeyboard()
        }
        .gesture(DragGesture().updating($dragOffset, body: { (value, state, transaction) in
            if(value.startLocation.x < 20 &&
               value.translation.width > 100) {
                self.presentationMode.wrappedValue.dismiss()
            }
        })
        )
        
    }
    
    private func register(){
        FirebaseManager.shared.auth.createUser(withEmail: signUpVM.email, password: signUpVM.password) { authResult, error in
            if let err = error{
                isUnsuccessful.toggle()
                errors = err.localizedDescription
            }else{
                isSuccessful.toggle()
            }
        }
    }
}

struct RegisterScreenView_Previews: PreviewProvider {
    static var previews: some View {
        RegisterScreenView()
    }
}

//MARK: - Close Button

extension RegisterScreenView {
    private var closeBtn: some View{
        HStack{
            CloseBtnView(color: .black)
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

//MARK: - Sign Up Form

extension RegisterScreenView {
    private var signUpForm: some View {
        VStack(alignment: .leading, spacing: 15.0) {
            Spacer()
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
            
            ScrollView {
                VStack(alignment: .center, spacing: 3.0) {
                    VStack(alignment: .leading, spacing: 10.0) {
                        Label(label: "Name")
                        RegisterTextFields(field: $signUpVM.name, placeholder: "Full Name", prompt: signUpVM.nameValid)
                            .textInputAutocapitalization(.words)
                            .submitLabel(.next)
                            .focused($focusedField, equals: .name)
                        
                        Label(label: "Email")
                        RegisterTextFields(field: $signUpVM.email, placeholder: "example@example.com", prompt: signUpVM.emailValid)
                            .textInputAutocapitalization(.never)
                            .keyboardType(.emailAddress)
                            .submitLabel(.next)
                            .focused($focusedField, equals: .email)
                        
                        Label(label: "Password")
                        RegisterTextFields(field: $signUpVM.password, isSecure: true, placeholder: "8+ Characters, 1 Capital Letter", prompt: signUpVM.passwordValid)
                            .keyboardType(.alphabet)
                            .focused($focusedField, equals: .password)
                            .submitLabel(.done)
                    }
                    .padding(.horizontal)
                    Spacer()
                    Button {
                        register()
                    } label: {
                        Text("Sign up")
                            .foregroundColor(.white)
                            .fontWeight(.bold)
                            .padding()
                            .frame(maxWidth: 300)
                            .background(Color("BasicColor"))
                            .cornerRadius(25)
                    }
                    .opacity(signUpVM.isSignUpComplete ? 1 : 0.5)
                    .disabled(!signUpVM.isSignUpComplete)
                    .alert(isPresented: $isUnsuccessful){
                        Alert(title: Text("Error"), message: Text(errors), dismissButton: .cancel(Text("Okay")))
                    }
                    .fullScreenCover(isPresented: $isSuccessful) {
                        ExtraInfoView(comm: .init(name: signUpVM.name, email: signUpVM.email))
                    }
                    
                    Spacer()
                    
                    HStack{
                        Text("Already have an account?")
                            .foregroundColor(.black.opacity(0.6))
                        NavigationLink(destination: LoginScreenView().navigationBarHidden(true)) {
                            Text("Sign In")
                                .foregroundColor(Color("BasicColor"))
                        }
                    }
                }
            }
            Spacer()
        }
    }
}

struct SocialLogo: View {
    var login: String
    var body: some View {
        Image(login)
            .resizable()
            .aspectRatio(contentMode: .fit)
            .frame(width: 30, height: 30)
            .padding()
            .background(.white)
            .cornerRadius(10)
            .shadow(color: Color.black.opacity(0.2), radius: 6, x: 2, y: 2)
    }
}
