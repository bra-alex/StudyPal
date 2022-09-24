//
//  RegisterTextFields.swift
//  StudyPal SwiftUI
//
//  Created by Don Bouncy on 19/07/2022.
//

import SwiftUI

struct Label: View {
    var label: String
    var body: some View {
        Text(label)
            .foregroundColor(.black.opacity(0.5))
            .font(.custom("Helvetica", size: 15))
            .padding(.leading)
    }
}

struct RegisterTextFields: View {
    @Binding var field: String
    var isSecure: Bool = false
    var placeholder: String
    var prompt: String
    
    var body: some View {
        VStack(alignment: .leading) {
            if isSecure{
                SecureField(placeholder, text: $field)
                    .autocorrectionDisabled()
                    .textInputAutocapitalization(.never)
                    .frame(maxWidth: 280)
                    .padding(13.0)
                    .foregroundColor(.black)
                    .background(
                        .white,
                        in: RoundedRectangle(cornerRadius: 15, style: .continuous)
                    )
                    .overlay {
                        RoundedRectangle(cornerRadius: 15, style: .continuous)
                            .stroke(Color.black.opacity(0.6) , lineWidth: 2)
                    }
            } else{
                TextField(placeholder, text: $field)
                    .autocorrectionDisabled()
                    .frame(maxWidth: 280)
                    .padding(13.0)
                    .foregroundColor(.black)
                    .background(
                        .white,
                        in: RoundedRectangle(cornerRadius: 15, style: .continuous)
                    )
                    .overlay {
                        RoundedRectangle(cornerRadius: 15, style: .continuous)
                            .stroke(Color.black.opacity(0.6) , lineWidth: 2)
                    }
            }
            Text(prompt)
                //.frame(maxWidth: 280.0)
                .fixedSize(horizontal: false, vertical: true)
                .font(.caption)
                .padding(.vertical, 4.0)
                .foregroundColor(.red)
        }
    }
    
}

struct RegisterTextFields_Previews: PreviewProvider {
    static var previews: some View {
        Label(label: "name")
        //RegisterTextFields(field: $name, placeholder: "name", prompt: "prompt")
            .previewLayout(.sizeThatFits)
    }
}
