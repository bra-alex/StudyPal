//
//  SocialLogo.swift
//  StudyPal SwiftUI
//
//  Created by Don Bouncy on 02/01/2023.
//

import SwiftUI

struct SocialLogo: View {
    var login: String
    var body: some View {
        Image(login)
            .resizable()
            .aspectRatio(contentMode: .fit)
            .frame(width: 30, height: 30)
            .padding()
            .background(.white)
            .cornerRadius(10)
            .shadow(color: Color.black.opacity(0.2), radius: 6, x: 2, y: 2)
    }
}

struct SocialLogo_Previews: PreviewProvider {
    static var previews: some View {
        SocialLogo(login: "Login")
    }
}
