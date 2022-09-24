//
//  TabButtons.swift
//  StudyPal SwiftUI
//
//  Created by Don Bouncy on 26/07/2022.
//

import SwiftUI


struct TabButtons: View {
    var image: String
    var name: String
    @Binding var tab: String
    var body: some View {
        Button(action: {
            withAnimation {
                tab = name
            }
        }, label: {
            Image(systemName: image)
                .resizable()
                .renderingMode(.template)
                .aspectRatio(contentMode: .fit)
                .frame(width: 23, height: 22)
                .foregroundColor(tab == name ? .primary : .gray)
                .frame(maxWidth: .infinity)
        })
    }
}

struct TabButtons_Previews: PreviewProvider {
    static var previews: some View {
        TabButtons(image: "globe", name: "Forum", tab: .constant("Forum"))
    }
}
