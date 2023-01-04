//
//  DocumentPicker.swift
//  StudyPal SwiftUI
//
//  Created by Don Bouncy on 25/09/2022.
//

import Foundation
import SwiftUI
import UniformTypeIdentifiers
import FirebaseStorage

struct DocumentPicker: UIViewControllerRepresentable{
    @Binding var alert: Bool
    @Binding var upload: Bool
    var resourcesVM: ResourcesViewModel
    
    func makeCoordinator() -> Coordinator {
        return DocumentPicker.Coordinator(parent1: self)
    }
    
    func makeUIViewController(context: UIViewControllerRepresentableContext<DocumentPicker>) -> UIDocumentPickerViewController {
        
        let picker = UIDocumentPickerViewController(forOpeningContentTypes: [.item], asCopy: true)
        picker.allowsMultipleSelection = false
        picker.delegate = context.coordinator
        
        return picker
    }
    
    func updateUIViewController(_ uiViewController: UIDocumentPickerViewController, context: UIViewControllerRepresentableContext<DocumentPicker>) {
        
    }
    
    class Coordinator: NSObject, UIDocumentPickerDelegate{
        var parent: DocumentPicker
        
        init(parent1: DocumentPicker) {
            parent = parent1
        }
        
        func documentPicker(_ controller: UIDocumentPickerViewController, didPickDocumentsAt urls: [URL]) {
            let storagePath = "gs://studypal-swiftui.appspot.com/resources/"
            let bucket = FirebaseManager.shared.storage.reference(forURL: storagePath)
            
            let uploadTask = bucket.child((urls.first?.lastPathComponent)!).putFile(from: urls.first!)
            
            self.parent.upload.toggle()
            
            uploadTask.observe(.progress) { snapshot in
                self.parent.resourcesVM.progress = CGFloat(Double(snapshot.progress!.completedUnitCount) / Double(snapshot.progress!.totalUnitCount))
            }
            
            uploadTask.observe(.failure) { snapshot in
                if let error = snapshot.error as? NSError {
                    switch (StorageErrorCode(rawValue: error.code)!) {
                    case .objectNotFound:
                        // File doesn't exist
                        print("File doesn't exist")
                        break
                        
                    case .unauthorized:
                        // User doesn't have permission to access file
                        print("File doesn't exist")
                        break
                        
                    case .cancelled:
                        // User canceled the upload
                        print("File doesn't exist")
                        break
                        
                    case .unknown:
                        // Unknown error occurred, inspect the server response
                        print("File doesn't exist")
                        break
                        
                    default:
                        // A separate error occurred. This is a good place to retry the upload.
                        print("File doesn't exist")
                        break
                    }
                }
            }
            
            uploadTask.observe(.success) { _ in
                self.parent.upload.toggle()
                self.parent.alert.toggle()
                uploadTask.removeAllObservers()
                self.parent.resourcesVM.progress = 0.0
                self.parent.resourcesVM.getFiles()
            }
            
        }
    }
}
