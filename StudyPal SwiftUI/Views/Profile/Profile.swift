//
//  Profile.swift
//  StudyPal SwiftUI
//
//  Created by Don Bouncy on 20/08/2022.
//

import SwiftUI

struct Profile: View {
    @State private var edit = false
    @State private var changeProfilePicture = false
    @State private var newProfilePicture: UIImage?
    var body: some View {
        ScrollView{
            HStack{
                Spacer()
                ZStack(alignment: .topTrailing) {
                    if let image = self.newProfilePicture{
                        Image(uiImage: image)
                            .resizable()
                            .scaledToFill()
                            .clipped()
                            .frame(width: 125, height: 125 )
                            .cornerRadius(150)
                            .padding(.vertical)
                            .overlay {
                                Circle().stroke(Color("BasicColor"), lineWidth: 3)
                            }
                            .padding(.trailing)
                    } else {
                        Image(systemName: "person.circle.fill")
                            .resizable()
                            .scaledToFill()
                            .clipped()
                            .foregroundColor(.white)
                            .background(Color.black)
                            .cornerRadius(150)
                            .frame(width: 125, height: 125)
                            .padding(.vertical)
                            .overlay {
                                Circle().stroke(Color("BasicColor"), lineWidth: 3)
                            }
                            .padding(.trailing)
                    }
                    
                    Button {
                        changeProfilePicture.toggle()
                    } label: {
                        Image(systemName: "pencil.circle.fill")
                            .resizable()
                            .scaledToFill()
                            .clipped()
                            .foregroundColor(Color.white)
                            .background(Color("BasicColor").opacity(0.9))
                            .cornerRadius(40)
                            .frame(width: 40, height: 40)
                            .padding(.top, 25)
                            .padding(.trailing, 8)
                    }
                    .opacity(edit ? 1 : 0)
                    .disabled(!edit)
                    .animation(.easeInOut(duration: 0.2), value: edit)
                }
                Spacer()
            }
            
            Button {
                newProfilePicture = nil
            } label: {
                Text("Remove profile photo")
                    .font(.headline)
                    .foregroundColor(Color("BasicColor"))
            }
            .padding(.bottom)
            .opacity(edit ? 1 : 0)
            .disabled(!edit)
            .animation(.easeInOut(duration: 0.2), value: edit)
            .sheet(isPresented: $changeProfilePicture) {
                ImagePicker(image: $newProfilePicture)
            }
            
            ProfileTextFields(edit: edit, title: "Name", color: .gray, txtColor: .black)
                .padding(.bottom)
            
            ProfileTextFields(edit: edit, title: "Email", color: .gray, txtColor: .black)
                .padding(.bottom)
            
            ProfileTextFields(edit: edit, title: "Username", color: .gray, txtColor: .black)
                .padding(.bottom)
            
            ProfileTextFields(edit: edit, title: "Password", color: .gray, txtColor: .black, isSecure: true)
        }
        .navigationTitle(edit ? "Edit Profile" : "Profile")
        .navigationBarTitleDisplayMode(.inline)
        .toolbar {
            ToolbarItem(placement: .navigationBarTrailing) {
                Button {
                    edit.toggle()
                } label: {
                    Text(edit ? "Done" : "Edit")
                        .padding(.trailing)
                }
            }
        }
    }
}

struct Profile_Previews: PreviewProvider {
    static var previews: some View {
        NavigationView{
            Profile()
        }
    }
}

struct ProfileTextFields: View {
    var edit: Bool
    @State var text = ""
    var title: String
    var color: Color
    var txtColor: Color
    var isSecure = false
    
    var body: some View {
        VStack(alignment: .leading, spacing: 13){
            Text(title)
                .font(.headline)
                .foregroundColor(.black.opacity(0.9))
            
            LoginTextFields(text: $text, title: title, imgName: "", isSecure: isSecure, color: color, txtColor: txtColor)
                .disabled(!edit)
        }
    }
}
