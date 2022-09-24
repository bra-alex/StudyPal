//
//  GroupChatModel.swift
//  StudyPal SwiftUI
//
//  Created by Don Bouncy on 17/08/2022.
//

import Foundation
import FirebaseFirestoreSwift

struct GroupChatModel: Codable, Identifiable{
    @DocumentID var id: String?
    let title: String
    let joinCode: Int
    let isPublic: Bool
    let time: Date
    let users: [String]
}

