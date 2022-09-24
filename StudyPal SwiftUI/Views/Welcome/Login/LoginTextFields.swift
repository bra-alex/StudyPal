//
//  CustomTextFields.swift
//  StudyPal SwiftUI
//
//  Created by Don Bouncy on 18/07/2022.
//

import SwiftUI

struct LoginTextFields: View {
    @Binding var text: String
    var title: String
    var imgName: String
    var isSecure = false
    var body: some View {
        ZStack(alignment: .leading){
            if text.isEmpty {
                HStack {
                    Icon(imgName: " ")
                    Text(title)
                        .foregroundColor(.white)
                        .font(.custom("Helvetica", size: 17))
                }
            }
            VStack {
                HStack(alignment: .center) {
                    Icon(imgName: imgName)
                    if isSecure{
                        SecureField("", text: $text)
                            .foregroundColor(.white)
                            .frame(maxWidth: 280)
                    } else {
                        TextField("", text: $text)
                            .foregroundColor(.white)
                            .frame(maxWidth: 280)
                    }
                    
                }
                HorizontalLine(color: .white)
            }
        }
    }
}

//struct CustomTextFields_Previews: PreviewProvider {
//    static var previews: some View {
//    LoginTextFields(text: "Username", title: "Username", imgName: "person.circle.fill")
//    }
//}

struct Icon: View {
    var imgName: String
    var body: some View {
        Image(systemName: imgName)
            .resizable()
            .aspectRatio(contentMode: .fit)
            .frame(width: 20.0, height: 20)
            .foregroundColor(.white)
    }
}
