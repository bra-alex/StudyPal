//
//  SideMenuViewModel.swift
//  StudyPal SwiftUI
//
//  Created by Don Bouncy on 25/07/2022.
//

import Foundation
import SwiftUI

enum SideMenuViewModel: Int, CaseIterable{
    case profile
    case topics
    case resources
    case stickyNotes
    case miniGames
    case logout
    
    var title: String{
        switch self{
        case .profile: return "Profile"
        case .topics: return "Topics"
        case .resources: return "Resources"
        case .stickyNotes: return "Sticky Notes"
        case .miniGames: return "Mini Games"
        case .logout: return "Logout"
        }
    }
    
    var imageName: String{
        switch self{
        case .profile: return "person"
        case .topics: return "text.book.closed"
        case .resources: return "doc.plaintext"
        case .stickyNotes: return "note.text"
        case .miniGames: return "gamecontroller"
        case .logout: return "arrow.left.square"
        }
    }
    
    @ViewBuilder var view: some View{
        switch self{
            case .profile: Profile()
            case .topics:  Topics(user: UserViewModel().user)
            case .resources:  Resources()
            case .stickyNotes:  StickyNotes()
            case .miniGames: MiniGames()
            case .logout: LoginScreenView()
//            WelcomeScreenView()
        }
    }
    
    var viewName: String{
        switch self{
        case .profile: return "Profile"
        case .topics: return "Topics"
        case .resources: return "Resources"
        case .stickyNotes: return "StickyNotes"
        case .miniGames: return "Mini Games"
        case .logout: return "Logout"
        }
    }
    
}
