export class Comments {
    postCommentID: number;
    userID: number;
    userComment: string;
    userPostID: number;
    timePosted: Date;
    post: {
        userPostID: number;
        userID: number;
        description: string;
        timeStamp: Date;
        category: number;
        userPrivacy: string;
        post_image: string;
        title: string;
    }
    user:{
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
        deleted:string;   
    }
}
