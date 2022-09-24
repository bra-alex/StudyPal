//
//  GroupMessage.swift
//  StudyPal SwiftUI
//
//  Created by Don Bouncy on 18/08/2022.
//

import Foundation
import FirebaseFirestoreSwift

struct GroupMessage: Codable, Identifiable{
    @DocumentID var id: String?
    let sender: String
    let name: String
    let message : String
    let time: Date
    
}
