//
//  FirebaseManager.swift
//  StudyPal SwiftUI
//
//  Created by Don Bouncy on 28/07/2022.
//

import Foundation
import FirebaseCore
import FirebaseFirestore
import FirebaseAnalytics
import FirebaseAuth
import FirebaseStorage


class FirebaseManager: NSObject{
    let auth: Auth
    let storage: Storage
    let firestore: Firestore
    
    static let shared = FirebaseManager()
    
    override init(){
        FirebaseApp.configure()
        self.auth = Auth.auth()
        self.storage = Storage.storage()
        self.firestore = Firestore.firestore()
        
        super.init()
    }
}
