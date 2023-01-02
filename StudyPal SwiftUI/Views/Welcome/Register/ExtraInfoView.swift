//
//  ExtraInfoView.swift
//  StudyPal SwiftUI
//
//  Created by Don Bouncy on 28/07/2022.
//

import SwiftUI

struct ExtraInfoView: View {
    @ObservedObject var authController: AuthController
    @FocusState var focusedField: FormFields?
    
    @State private var shouldShowImagePicker = false
    @State private var image: UIImage?
    @State private var showPrompt = false
    
    var body: some View {
        if authController.isSuccessful{
            HomeView(authController: authController)
        }else{
            GeometryReader{ _ in
                ZStack {
                    Color(.white)
                        .ignoresSafeArea()
                    VStack(spacing: 40) {
                        Spacer()
                        VStack(spacing: 30) {
                            Text("Profile Info")
                                .font(.title)
                                .fontWeight(.semibold)
                                .foregroundColor(Color("BasicColor"))
                            
                            Text("Please provide your username and an optional profile photo.")
                                .font(.subheadline)
                                .fixedSize(horizontal: false, vertical: true)
                                .multilineTextAlignment(.center)
                                .foregroundColor(.black)
                        }
                        Spacer()
                        VStack(spacing: 40) {
                            Button {
                                shouldShowImagePicker.toggle()
                            } label: {
                                VStack {
                                    if let image = self.image{
                                        Image(uiImage: image)
                                            .resizable()
                                            .scaledToFill()
                                            .frame(width: 125, height: 125 )
                                            .cornerRadius(62.5)
                                    } else {
                                        Image(systemName: "camera")
                                            .resizable()
                                            .aspectRatio(contentMode: .fit)
                                            .padding()
                                            .frame(width: 125, height: 125)
                                            .foregroundColor(.white.opacity(0.9))
                                            .background {
                                                Color(.gray)
                                                    .opacity(0.3)
                                            }
                                            .cornerRadius(67)
                                    }
                                }
                            }
                            
                            VStack(alignment: .leading) {
                                TextField("Type your username here...", text: $authController.username, onEditingChanged: {_ in showPrompt.toggle()})
                                    .foregroundColor(.black)
                                    .frame(maxWidth: 300)
                                    .autocorrectionDisabled()
                                    .textInputAutocapitalization(.never)
                                    .focused($focusedField, equals: .username)
                                    .onAppear(){
                                        DispatchQueue.main.asyncAfter(deadline: .now() + 0.75){
                                            self.focusedField = .username
                                        }
                                    }
                                HorizontalLine(color: Color("BasicColor").opacity(0.7))
                                
                                Text(showPrompt ? authController.usernameValid : "")
                                    .frame(maxWidth: 300.0)
                                    .fixedSize(horizontal: false, vertical: true)
                                    .font(.caption)
                                    .padding(.vertical, 4.0)
                                    .foregroundColor(.red)
                                    .multilineTextAlignment(.center)
                                
                            }
                        }
                        
                        Spacer()
                        Spacer()
                        Spacer()
                        
                        Button {
                            if image == nil{
                                self.image = UIImage(named: "profile")
                                authController.persistImageToStorage(image)
                            } else {
                                authController.persistImageToStorage(image)
                            }
                        } label: {
                            Text("Next")
                                .foregroundColor(.white)
                                .fontWeight(.bold)
                                .padding()
                                .frame(width: 100)
                                .background(Color("BasicColor"))
                                .cornerRadius(10)
                        }
                        .opacity(authController.isUsernameValid() ? 1 : 0.5)
                        .disabled(!authController.isUsernameValid())
                    }
                    .sheet(isPresented: $shouldShowImagePicker) {
                        ImagePicker(image: $image)
                    }
                }
            }.ignoresSafeArea(.keyboard, edges: .all)
        }
    }
}


struct ExtraInfoView_Previews: PreviewProvider {
    static var previews: some View {
        ExtraInfoView(authController: AuthController())
    }
}
