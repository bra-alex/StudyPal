//
//  NavBar.swift
//  StudyPal SwiftUI
//
//  Created by Don Bouncy on 26/07/2022.
//

import SwiftUI

struct NavBar: View {
    @Binding var showMenu: Bool
    @ObservedObject var user = UserViewModel()
    
    var title: String
    var body: some View {
        VStack {
            HStack {
                Button {
                    withAnimation {
                        showMenu.toggle()
                    }
                } label: {
                    AsyncImage(url: URL(string: user.user?.profileImageUrl ?? ""), content: { image in
                        image.resizable()
                    }, placeholder: {})
                        .aspectRatio(contentMode: .fill)
                        .foregroundColor(.primary)
                        .frame(width: 35, height: 35)
                        .cornerRadius(45)
                }
                
                Spacer()
            }
            .padding(.horizontal)
//            .padding(.vertical, 10)
            Divider()
        }
        .overlay(
            Text(title)
                .font(.title3.bold())
                .frame(height: 15)
        )
        
    }
}

struct NavBar_Previews: PreviewProvider {
    static var previews: some View {
        NavBar(showMenu: .constant(false), title: "Forum")
    }
}
