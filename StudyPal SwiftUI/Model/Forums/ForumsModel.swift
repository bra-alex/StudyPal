//
//  ForumsModel.swift
//  StudyPal SwiftUI
//
//  Created by Don Bouncy on 19/08/2022.
//

import Foundation
import FirebaseFirestoreSwift

struct Forums: Codable, Identifiable{
    @DocumentID var id: String?
    let name: String
    let username: String
    let postContent: String
    let mediaURL: String
    let topic: String
    let time: Date
    let votes: Int
    let comments: [Comments]?
    
    var formattedTime: String{
        let formatter = RelativeDateTimeFormatter ()
        formatter.unitsStyle = .abbreviated
        return formatter.localizedString (for: time, relativeTo: Date())
    }
    
    struct Comments: Codable, Identifiable{
        @DocumentID var id: String?
        let name: String
        let username: String
        let postContent: String
        let mediaURL: String
        let topic: String
        let time: Date
        let votes: Int
        
        var formattedTime: String{
            let formatter = RelativeDateTimeFormatter ()
            formatter.unitsStyle = .abbreviated
            return formatter.localizedString (for: time, relativeTo: Date())
        }
    }
}


