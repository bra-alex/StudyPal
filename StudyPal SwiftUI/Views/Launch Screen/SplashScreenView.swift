//
//  SplashScreenView.swift
//  StudyPal SwiftUI
//
//  Created by Don Bouncy on 18/07/2022.
//

import SwiftUI

struct SplashScreenView: View {
    @StateObject var authController = AuthController()
    
    @State private var isActive = false
    @State private var size = 0.5
    @State private var opacity = 0.5
    var body: some View {
        if isActive{
            HomeView(authController: authController)
        } else {
            ZStack {
                Color("bgColor")
                    .ignoresSafeArea()
                VStack{
                    VStack{
                        Image("StudyPal")
                            .resizable()
                            .frame(width: 150, height: 150)
                        Text("StudyPal")
                            .font(.custom("Avenir", size: 64.0))
                            .foregroundColor(.black)
                            .fontWeight(.black)
                    }
                    .scaleEffect(size)
                    .opacity(opacity)
                    .onAppear{
                        withAnimation(.easeIn(duration: 2.0)){
                            self.size = 1.0
                            self.opacity = 1.0
                        }
                    }
                }
                .onAppear{
                    DispatchQueue.main.asyncAfter(deadline: .now() + 2.5){
                        withAnimation {
                            authController.isLoggedIn()
                            self.isActive = true
                        }
                    }
                }
            }
        }
    }
}

struct SplashScreenView_Previews: PreviewProvider {
    static var previews: some View {
        SplashScreenView()
    }
}
