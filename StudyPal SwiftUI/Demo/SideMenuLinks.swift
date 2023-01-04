//
//  SideMenuLinks.swift
//  StudyPal SwiftUI
//
//  Created by Don Bouncy on 26/07/2022.
//

import SwiftUI

struct SideMenuLinks: View {
    let user: UserInfo?
    
    var viewName: String
    var body: some View {
        switch viewName{
        case "Profile":
            Profile()
        case "Topics":
            Topics()
        case "Resources":
            Resources()
        case "StickyNotes":
            StickyNotes()
        case "Mini Games":
            MiniGames()
        case "Logout":
            Text("Me")//            WelcomeScreenView()
//                .navigationBarHidden(true)
        default:
            Text("Hello World")
        }
    }
}

struct SideMenuLinks_Previews: PreviewProvider {
    static var previews: some View {
        SideMenuLinks(user: .none, viewName: "Profile")
    }
}
