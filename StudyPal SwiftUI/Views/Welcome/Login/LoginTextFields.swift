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
    var color: Color
    var txtColor: Color
    var body: some View {
        ZStack(alignment: .leading){
            if text.isEmpty {
                HStack {
                    Text(title)
                        .foregroundColor(color)
                        .font(.custom("Helvetica", size: 17))
                        .padding(.leading, (imgName.isEmpty) ? 10 : 30)
                }
            }
            VStack {
                HStack(alignment: .center) {
                    if !imgName.isEmpty{
                        Icon(imgName: imgName)
                            .foregroundColor(txtColor)
                    }
                    if isSecure{
                        SecureField("", text: $text)
                            .foregroundColor(txtColor)
                            .frame(maxWidth: 280)
                        
                    } else {
                        TextField("", text: $text)
                            .foregroundColor(txtColor)
                            .frame(maxWidth: 280)
                        
                    }
                    
                }
                HorizontalLine(color: color)
            }
        }
    }
}

struct LoginTextFields_Previews: PreviewProvider {
    static var previews: some View {
        LoginTextFields(text: .constant(""), title: "Username", imgName: "person.circle.fill", color: .black, txtColor: .black)
    }
}

struct Icon: View {
    var imgName: String
    var body: some View {
        Image(systemName: imgName)
            .resizable()
            .aspectRatio(contentMode: .fit)
            .frame(width: 20.0, height: 20)
            .padding(.top, 4)
    }
}
