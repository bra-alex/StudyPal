//
//  DBCommunication.swift
//  StudyPal SwiftUI
//
//  Created by Don Bouncy on 28/07/2022.
//

import Foundation
import SwiftUI
import FirebaseFirestore

struct DBCommunication{
    var name: String
    var email: String
    
    func storeUserInfo(name: String, username: String, email: String, url: URL, _ isSuccessful: Binding<Bool>){
        
        guard let uid = FirebaseManager.shared.auth.currentUser?.uid else { return }
        
        let dbInfo = ["uid": uid, "name": name, "username": username, "email": email, "profileImageUrl": url.absoluteString]
        
        FirebaseManager.shared.firestore
            .collection("topics")
            .document("General")
            .updateData([
                "uid": FieldValue.arrayUnion([uid])
            ])
        
        FirebaseManager.shared.firestore
            .collection("users")
            .document(uid)
            .setData(dbInfo) { error in
            if let error = error{
                print(error.localizedDescription)
                return
            }else {
                isSuccessful.wrappedValue.toggle()
            }
        }
    }
}
