//
//  DateHelpers.swift
//  StudyPal SwiftUI
//
//  Created by Don Bouncy on 16/08/2022.
//

import Foundation

extension Date {
    
    func descriptiveString(dateStyle: DateFormatter.Style = .short) -> String {
        let formatter = DateFormatter()
        formatter.dateStyle = dateStyle
        
        let daysBetween = self.daysBetween(date: Date())
        
        if daysBetween == 0{
            formatter.dateStyle = .none
            formatter.timeStyle = .short
            
            return formatter.string(from: self)
        } else if daysBetween == 1{
            return "Yesterday"
        } else if daysBetween < 5{
            let weekdayIndex = Calendar.current.component(.weekday, from: self)
            return formatter.weekdaySymbols[weekdayIndex]
        }
        return formatter.string(from: self)
    }
    
    func daysBetween(date: Date) -> Int {
        let calender = Calendar.current
        let date1 = calender.startOfDay(for: self)
        let date2 = calender.startOfDay(for: date)
        
        if let daysBetween = calender.dateComponents([.day], from: date1, to: date2).day{
            return daysBetween
        }
        
        return 0
    }
}
