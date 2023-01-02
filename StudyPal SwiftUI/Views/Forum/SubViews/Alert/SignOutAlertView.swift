//
//  SwiftUIView.swift
//  StudyPal SwiftUI
//
//  Created by Don Bouncy on 29/07/2022.
//

import SwiftUI

struct SignOutAlertView: View {
    @ObservedObject var authController: AuthController
    @Binding var showAlert: Bool
    var body: some View {
        ZStack {
            Color.black
                .ignoresSafeArea()
                .opacity(0.3)
            VStack{
                Text("Log out of user?")
                    .fontWeight(.bold)
                    .padding()
                
                Divider()
                
                Button {
                    authController.signOut()
                } label: {
                    Text("Logout")
                        .foregroundColor(.red)
                }.frame(width: UIScreen.main.bounds.width - 100, height: 40)
                
                Divider()
                
                Button {
                    showAlert.toggle()
                } label: {
                    Text("Cancel")
                        .foregroundColor(.black)
                }.frame(width: UIScreen.main.bounds.width - 100, height: 40)


            }
            .padding(.vertical)
            .frame(width: UIScreen.main.bounds.width - 100)
            .background(.white)
        .cornerRadius(25)
        }
        
    }
}

struct SwiftUIView_Previews: PreviewProvider {
    static var previews: some View {
        SignOutAlertView(authController: AuthController(), showAlert: .constant(false))
    }
}
