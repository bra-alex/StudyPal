//
//  Message.swift
//  StudyPal SwiftUI
//
//  Created by Don Bouncy on 09/08/2022.
//

import Foundation
import FirebaseFirestoreSwift

struct Message: Codable, Identifiable{
    @DocumentID var id: String?
    let sender: String
    let receipient: String
    let message : String
    let time: Date
    
}
