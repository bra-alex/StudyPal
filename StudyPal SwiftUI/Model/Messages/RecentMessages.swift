//
//  RecentMessages.swift
//  StudyPal SwiftUI
//
//  Created by Don Bouncy on 11/08/2022.
//

import Foundation
import FirebaseFirestoreSwift

struct RecentMessages: Codable, Identifiable{
    @DocumentID var id: String?
    let sender: String
    let receipient: String
    let name: String
    let timestamp: Date
    let message: String
    let profileImageUrl: String
    let type: String
    
    var unread: Bool{
        if type == "Received"{
            return true
        } else {
            return false
        }
        
    }
    
    var timeAgo: String {
        return timestamp.descriptiveString()
    }
}
