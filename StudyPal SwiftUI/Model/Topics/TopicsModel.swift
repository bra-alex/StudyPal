//
//  TopicsModel.swift
//  StudyPal SwiftUI
//
//  Created by Don Bouncy on 21/08/2022.
//

import Foundation
import FirebaseFirestoreSwift

struct TopicsModel: Codable, Identifiable {
    @DocumentID var id: String?
    let name: String
    let uid: [String]
}
