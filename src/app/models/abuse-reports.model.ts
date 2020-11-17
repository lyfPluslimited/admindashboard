export class AbuseReports {
    postReportFeedbackID: number;
    postID: number;
    userID: number;
    message: string;
    timeReported: Date;
    post: {
        topicID: number;
        topicTitle: string;
        topic_image: string;
        additionDate: Date;
        userID: number;
    }
    reporter:{
        userID: number;
        firstName: string;
        lastName: string;
        dateOfBirth: string;
        email: string;
        password: string;
        phone: string;
        gender: string;
        age: number
        regionID: string;
        street: string;
        lat: string;
        longt: string;
        geo: string;
        timeSt: string;
        doctorsIDnumber: string;
        doctorsIDverificationStatus: string;
        status: string;
        userRole: number
        userNhifNumber: string;
        onlineStatus: number;
        specializationID: number;
        lastOnlineTime: string;
        user_image: string;
        height: string;
        weight: string;
        blood_group: string;
        doctorPromotionCode: string;
        userPromotionCode: string;
        allergy: string;
        doctor_bio: string;
        specilizationAreaID: number;
        experience: string;
        consultation_fee: number;
        no_initial_consultation: string;
        no_remain_consulatation: string;
        consultation_availabiliy: string;
        phone_availability: string;
        patient_no: string;
        ip_address: string;
        deleted: string;
    }
}
