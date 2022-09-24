//
//  UserInfo.swift
//  StudyPal SwiftUI
//
//  Created by Don Bouncy on 28/07/2022.
//

import Foundation
import SwiftUI
import FirebaseFirestoreSwift

struct UserInfo: Codable, Identifiable{
    @DocumentID var id: String?
    let name: String
    let email: String
    let username: String
    let profileImageUrl: String
    
}
