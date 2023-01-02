//
//  RegisterScreenView.swift
//  StudyPal SwiftUI
//
//  Created by Don Bouncy on 18/07/2022.
//

import SwiftUI

struct RegisterScreenView: View {
    @ObservedObject var authController: AuthController
    
    var body: some View {
        ZStack {
            Image("RegisterBgImage")
                .resizable()
                .ignoresSafeArea()
            
            SignUpForm(authController: authController)
        }
        .onTapGesture {
            hideKeyboard()
        }
    }
}

struct RegisterScreenView_Previews: PreviewProvider {
    static var previews: some View {
        RegisterScreenView(authController: AuthController())
    }
}
