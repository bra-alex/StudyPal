//
//  Buttons.swift
//  StudyPal SwiftUI
//
//  Created by Don Bouncy on 18/07/2022.
//

import SwiftUI

struct Buttons: View {
    var text: String
    var color: String
    var body: some View {
        Text(text)
            .frame(maxWidth: .infinity)
            .font(.title2)
            .fontWeight(.bold)
            .padding()
            .background(Color(color))
            .cornerRadius(50)
    }
}

struct Buttons_Previews: PreviewProvider {
    static var previews: some View {
        Buttons(text: "Login", color: "BasicColor")
    }
}
