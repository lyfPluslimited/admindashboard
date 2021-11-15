export class HomeService {
    home_services_id: number;
    service_name: string;
    service_image: string;
    timeStamp: Date;
}

export class ConfirmedVisit{
    confirmation_id: number;
    user_id: number;
    service_id: number;
    visitation_date: string;
    phone: string;
    created_at: Date;
    updated_at: Date;
    client: {
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
        deleted: boolean;
        }
    service: {
        home_services_id: number;
        service_name: string;
        service_image: string;
        timeStamp: Date;
        }

}