//
//  WelcomeScreenView.swift
//  StudyPal SwiftUI
//
//  Created by Don Bouncy on 18/07/2022.
//

import SwiftUI

struct WelcomeScreenView: View {
    var body: some View {
        GeometryReader { _ in
            ZStack {
                Color("bgColor")
                    .ignoresSafeArea()
                
                NavigationStack {
                    VStack {
                        Spacer()
                        Image("logo")
                            .resizable()
                            .aspectRatio(contentMode: .fit)
                            .frame(width: 350, height: 300)
                        
                        Spacer()
                        
                        NavigationLink(destination: LoginScreenView().navigationBarHidden(true)) {
                            Buttons(text: "Login", color: "BasicColor")
                                .foregroundColor(.white)
                        }.isDetailLink(false)
                        
                        NavigationLink(destination: RegisterScreenView().navigationBarHidden(true)) {
                            Buttons(text: "Sign Up", color: "BasicColor2")
                                .foregroundColor(Color("BasicColor"))
                        }.isDetailLink(false)
                        Spacer()
                    }
                    .padding()
                }
            }
        }.ignoresSafeArea(.keyboard, edges: .all)
        
    }
}

struct WelcomeScreenView_Previews: PreviewProvider {
    static var previews: some View {
        WelcomeScreenView()
    }
}
