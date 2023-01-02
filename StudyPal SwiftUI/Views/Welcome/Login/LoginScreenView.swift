//
//  LoginScreenView.swift
//  StudyPal SwiftUI
//
//  Created by Don Bouncy on 18/07/2022.
//

import SwiftUI

struct LoginScreenView: View {
    @ObservedObject var authController: AuthController
    
    var body: some View {
        NavigationStack {
            if authController.isSuccessful{
                withAnimation {
                    HomeView(authController: authController)
                }
            } else {
                GeometryReader { _ in
                    ZStack {
                        Image("LoginBgImage")
                            .resizable()
                            .ignoresSafeArea()
                        
                        Form {
                            LoginForm(authController: authController)
                        }
                        .formStyle(.columns)
                    }
                    .onTapGesture {
                        hideKeyboard()
                    }
                }
                .ignoresSafeArea(.keyboard, edges: .all)
            }
        }
    }
}

struct LoginScreenView_Previews: PreviewProvider {
    static var previews: some View {
        LoginScreenView(authController: AuthController())
    }
}
