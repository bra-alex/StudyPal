//
//  ExtraInfoView.swift
//  StudyPal SwiftUI
//
//  Created by Don Bouncy on 28/07/2022.
//

import SwiftUI

struct ExtraInfoView: View {
    let comm: DBCommunication
    @ObservedObject var signUpVM = SignUpViewModel()
    @FocusState var focusedField: FormFields?
    @State private var shouldShowImagePicker = false
    @State private var image: UIImage?
    @State private var showPrompt = false
    @State var isSuccessful = false
    
    
    var body: some View {
        if isSuccessful{
            HomeView()
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
                                TextField("Type your username here...", text: $signUpVM.username, onEditingChanged: {_ in showPrompt.toggle()})
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
                                
                                Text(showPrompt ? signUpVM.usernameValid : "")
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
                                persistImageToStorage()
                            } else {
                                persistImageToStorage()
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
                        .opacity(signUpVM.isUsernameValid() ? 1 : 0.5)
                        .disabled(!signUpVM.isUsernameValid())
                    }
                    .sheet(isPresented: $shouldShowImagePicker) {
                        ImagePicker(image: $image)
                    }
                }
            }.ignoresSafeArea(.keyboard, edges: .all)
        }
    }
    
    private func persistImageToStorage(){
        guard let uid = FirebaseManager.shared.auth.currentUser?.uid
        else { return }
        
        let ref = FirebaseManager.shared.storage.reference(withPath: uid)
        
        guard let imageData = image?.jpegData(compressionQuality: 0.5)
        else { return }
        ref.putData(imageData) { metadata, error in
            if error != nil{
                print(error!.localizedDescription)
            }
            
            ref.downloadURL { url, error in
                if error != nil{
                    print("Could not retrieve url")
                    return
                }
                guard let url = url else { return }
                
                comm.storeUserInfo(name: comm.name, username: signUpVM.username, email: comm.email, url: url, $isSuccessful)
            }
            
            
        }
    }
}


struct ExtraInfoView_Previews: PreviewProvider {
    static var previews: some View {
        ExtraInfoView(comm: .init(name: "", email: ""))
    }
}
