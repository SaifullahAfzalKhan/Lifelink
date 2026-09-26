import React, { createContext, useContext, useState } from 'react';

export type UserRole = 'patient' | 'donor' | 'hospital';
export type BloodGroup = 'A+' | 'A-' | 'B+' | 'B-' | 'O+' | 'O-' | 'AB+' | 'AB-';
export type RequestStatus = 'matching' | 'partial' | 'fulfilled' | 'closed';

export interface BloodRequest {
  id: string;
  patientName: string;
  bloodGroup: BloodGroup;
  units: number;
  urgency: 'critical' | 'urgent' | 'standard';
  urgencyLabel: string;
  hospital: string;
  department: string;
  address: string;
  distance: string;
  driveTime: string;
  status: RequestStatus;
  donorsMatched: number;
  donorsRequired: number;
  createdAt: string;
  verificationToken: string;
  phone: string;
}

export interface BloodBank {
  id: string;
  name: string;
  department: string;
  address: string;
  distance: string;
  driveTime: string;
  phone: string;
  isOpen247: boolean;
  isVerified: boolean;
  stockLevel: Record<BloodGroup, number>;
}

export interface AlertItem {
  id: string;
  title: string;
  description: string;
  category: 'requests' | 'system';
  time: string;
  isUnread: boolean;
  badge?: string;
  type: 'critical' | 'donor' | 'hospital' | 'system';
}

export interface DonationRecord {
  id: string;
  facility: string;
  date: string;
  bloodGroup: BloodGroup;
  units: number;
  status: 'Completed' | 'Scheduled';
  certificateId: string;
  livesImpacted: number;
}

export interface InventoryItem {
  group: BloodGroup;
  units: number;
  status: 'normal' | 'low' | 'critical';
  reserved: number;
  lastUpdated: string;
}

export interface UserProfile {
  name: string;
  role: UserRole;
  refId: string;
  phone: string;
  email: string;
  bloodGroup: BloodGroup;
  city: string;
  hospital: string;
  isVerified: boolean;
  donationsCompleted?: number;
  livesImpacted?: number;
  orgType?: 'Hospital' | 'Blood Bank';
  licenseNumber?: string;
}

interface AppContextType {
  role: UserRole;
  setRole: (role: UserRole) => void;
  isAuthenticated: boolean;
  login: (role?: UserRole) => void;
  logout: () => void;
  profile: UserProfile;
  updateProfile: (updated: Partial<UserProfile>) => void;
  requests: BloodRequest[];
  activeRequest: BloodRequest;
  createRequest: (newReq: Partial<BloodRequest>) => BloodRequest;
  updateRequestStatus: (id: string, status: RequestStatus) => void;
  donorAvailable: boolean;
  toggleDonorAvailable: () => void;
  alerts: AlertItem[];
  markAllAlertsRead: () => void;
  markAlertRead: (id: string) => void;
  inventory: InventoryItem[];
  updateStock: (group: BloodGroup, delta: number) => void;
  bloodBanks: BloodBank[];
  donationHistory: DonationRecord[];
  hospitalVerificationState: 'pending' | 'review' | 'verified' | 'action';
  setHospitalVerificationState: (state: 'pending' | 'review' | 'verified' | 'action') => void;
  acceptedOpportunityId: string | null;
  setAcceptedOpportunityId: (id: string | null) => void;
}

const INITIAL_REQUESTS: BloodRequest[] = [
  {
    id: '#REQ-9482',
    patientName: 'Tariq Mehmood',
    bloodGroup: 'B+',
    units: 2,
    urgency: 'urgent',
    urgencyLabel: 'Needed in 2 hrs',
    hospital: 'Shaukat Khanum Blood Bank',
    department: 'Emergency Wing • Ward 4B',
    address: '7A Khayaban-e-Firdousi, Johar Town, Lahore',
    distance: '2.4 km',
    driveTime: '< 15 min drive',
    status: 'partial',
    donorsMatched: 1,
    donorsRequired: 2,
    createdAt: 'Today, 14:28 PM (42m ago)',
    verificationToken: '#SK-882 • Certified',
    phone: '1021',
  },
  {
    id: '#REQ-9104',
    patientName: 'Amina Bibi',
    bloodGroup: 'O-',
    units: 1,
    urgency: 'critical',
    urgencyLabel: 'Critical • Under 1 hr',
    hospital: 'Jinnah Hospital Trauma Center',
    department: 'ICU Ward 2',
    address: 'Allama Iqbal Town, Lahore',
    distance: '4.8 km',
    driveTime: '18 min drive',
    status: 'matching',
    donorsMatched: 0,
    donorsRequired: 1,
    createdAt: 'Today, 15:10 PM (10m ago)',
    verificationToken: '#JH-401 • Certified',
    phone: '1021',
  },
  {
    id: '#REQ-8790',
    patientName: 'Hamza Zubair',
    bloodGroup: 'A+',
    units: 3,
    urgency: 'standard',
    urgencyLabel: 'Needed Tomorrow',
    hospital: 'Doctors Hospital & Medical Center',
    department: 'Surgical Ward',
    address: 'Canal Bank Rd, Johar Town, Lahore',
    distance: '3.1 km',
    driveTime: '12 min drive',
    status: 'fulfilled',
    donorsMatched: 3,
    donorsRequired: 3,
    createdAt: 'Yesterday, 18:00 PM',
    verificationToken: '#DH-912 • Certified',
    phone: '1021',
  },
];

const INITIAL_BLOOD_BANKS: BloodBank[] = [
  {
    id: 'bb-1',
    name: 'Shaukat Khanum Blood Bank',
    department: 'Emergency Trauma Wing',
    address: '7A Khayaban-e-Firdousi, Johar Town, Lahore',
    distance: '2.4 km',
    driveTime: '8 mins away',
    phone: '1021',
    isOpen247: true,
    isVerified: true,
    stockLevel: { 'A+': 12, 'A-': 4, 'B+': 8, 'B-': 3, 'O+': 18, 'O-': 2, 'AB+': 5, 'AB-': 1 },
  },
  {
    id: 'bb-2',
    name: 'Doctors Hospital Blood Bank',
    department: 'Clinical Pathology Department',
    address: '152-G/1 Canal Bank Rd, Johar Town, Lahore',
    distance: '3.1 km',
    driveTime: '12 mins away',
    phone: '1021',
    isOpen247: true,
    isVerified: true,
    stockLevel: { 'A+': 9, 'A-': 2, 'B+': 14, 'B-': 1, 'O+': 22, 'O-': 4, 'AB+': 3, 'AB-': 0 },
  },
  {
    id: 'bb-3',
    name: 'Al-Khidmat Diagnostic Center',
    department: 'Regional Blood Transfusion Wing',
    address: 'Main Boulevard, Faisal Town, Lahore',
    distance: '4.5 km',
    driveTime: '15 mins away',
    phone: '1021',
    isOpen247: true,
    isVerified: true,
    stockLevel: { 'A+': 20, 'A-': 5, 'B+': 16, 'B-': 6, 'O+': 25, 'O-': 5, 'AB+': 8, 'AB-': 2 },
  },
  {
    id: 'bb-4',
    name: 'Jinnah Hospital Blood Bank',
    department: 'Govt. Emergency Wing',
    address: 'Usman Block, Garden Town, Lahore',
    distance: '5.2 km',
    driveTime: '18 mins away',
    phone: '1021',
    isOpen247: true,
    isVerified: true,
    stockLevel: { 'A+': 15, 'A-': 3, 'B+': 10, 'B-': 2, 'O+': 30, 'O-': 1, 'AB+': 4, 'AB-': 1 },
  },
];

const INITIAL_ALERTS: AlertItem[] = [
  {
    id: 'alt-1',
    title: 'Emergency Request Broadcast Active',
    description: '14 registered B+ donors around Johar Town notified for #REQ-9482.',
    category: 'requests',
    time: '2m ago',
    isUnread: true,
    badge: 'Critical Dispatch',
    type: 'critical',
  },
  {
    id: 'alt-2',
    title: 'Donor Responded: Ali Raza En Route',
    description: '1 whole blood unit accepted. ETA ~18m at Shaukat Khanum Blood Bank.',
    category: 'requests',
    time: '8m ago',
    isUnread: true,
    badge: 'En Route',
    type: 'donor',
  },
  {
    id: 'alt-3',
    title: 'Hospital Verification Completed',
    description: 'Prescription & clinician token verified by Dr. Salman Tariq (#SK-882).',
    category: 'system',
    time: '18m ago',
    isUnread: true,
    badge: 'Verified',
    type: 'hospital',
  },
  {
    id: 'alt-4',
    title: 'Regional Blood Network Sync',
    description: 'Lahore Central Hub synchronized inventory records with 8 facilities.',
    category: 'system',
    time: '1h ago',
    isUnread: false,
    badge: 'Sync Log',
    type: 'system',
  },
  {
    id: 'alt-5',
    title: 'Eligibility Notice: Ready to Donate',
    description: 'It has been 92 days since your last voluntary blood donation.',
    category: 'system',
    time: '3h ago',
    isUnread: false,
    badge: 'Eligibility',
    type: 'system',
  },
  {
    id: 'alt-6',
    title: 'Blood Units Transfused #REQ-8790',
    description: '3 units A+ successfully transfused at Doctors Hospital.',
    category: 'requests',
    time: 'Yesterday',
    isUnread: false,
    badge: 'Fulfilled',
    type: 'hospital',
  },
];

const INITIAL_INVENTORY: InventoryItem[] = [
  { group: 'A+', units: 14, status: 'normal', reserved: 3, lastUpdated: '10m ago' },
  { group: 'A-', units: 4, status: 'low', reserved: 1, lastUpdated: '35m ago' },
  { group: 'B+', units: 8, status: 'normal', reserved: 2, lastUpdated: 'Just now' },
  { group: 'B-', units: 2, status: 'critical', reserved: 1, lastUpdated: '2h ago' },
  { group: 'O+', units: 22, status: 'normal', reserved: 5, lastUpdated: '15m ago' },
  { group: 'O-', units: 1, status: 'critical', reserved: 1, lastUpdated: '1h ago' },
  { group: 'AB+', units: 6, status: 'normal', reserved: 0, lastUpdated: '4h ago' },
  { group: 'AB-', units: 1, status: 'critical', reserved: 0, lastUpdated: '6h ago' },
];

const INITIAL_DONATION_HISTORY: DonationRecord[] = [
  {
    id: 'dh-1',
    facility: 'Doctors Hospital & Medical Center',
    date: '3 weeks ago (Aug 24, 2026)',
    bloodGroup: 'B+',
    units: 1,
    status: 'Completed',
    certificateId: '#CRT-9921-LK',
    livesImpacted: 3,
  },
  {
    id: 'dh-2',
    facility: 'Shaukat Khanum Blood Bank',
    date: 'May 12, 2026',
    bloodGroup: 'B+',
    units: 1,
    status: 'Completed',
    certificateId: '#CRT-8412-LK',
    livesImpacted: 3,
  },
  {
    id: 'dh-3',
    facility: 'Jinnah Hospital Blood Bank',
    date: 'Jan 28, 2026',
    bloodGroup: 'B+',
    units: 1,
    status: 'Completed',
    certificateId: '#CRT-7104-LK',
    livesImpacted: 3,
  },
  {
    id: 'dh-4',
    facility: 'Al-Khidmat Central Blood Bank',
    date: 'Oct 14, 2025',
    bloodGroup: 'B+',
    units: 1,
    status: 'Completed',
    certificateId: '#CRT-6291-LK',
    livesImpacted: 3,
  },
  {
    id: 'dh-5',
    facility: 'Doctors Hospital & Medical Center',
    date: 'Jun 19, 2025',
    bloodGroup: 'B+',
    units: 1,
    status: 'Completed',
    certificateId: '#CRT-5182-LK',
    livesImpacted: 3,
  },
  {
    id: 'dh-6',
    facility: 'Shaukat Khanum Blood Bank',
    date: 'Feb 10, 2025',
    bloodGroup: 'B+',
    units: 1,
    status: 'Completed',
    certificateId: '#CRT-4091-LK',
    livesImpacted: 3,
  },
];

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [role, setRole] = useState<UserRole>('patient');
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);
  const [donorAvailable, setDonorAvailable] = useState<boolean>(true);
  const [hospitalVerificationState, setHospitalVerificationState] = useState<
    'pending' | 'review' | 'verified' | 'action'
  >('verified');
  const [acceptedOpportunityId, setAcceptedOpportunityId] = useState<string | null>(null);

  const [profile, setProfile] = useState<UserProfile>({
    name: 'Tariq Mehmood',
    role: 'patient',
    refId: '#PT-88390',
    phone: '+92 300 1234567',
    email: 'tariq.mehmood@example.com',
    bloodGroup: 'B+',
    city: 'Johar Town, Lahore',
    hospital: 'Shaukat Khanum Memorial Hospital',
    isVerified: true,
    donationsCompleted: 6,
    livesImpacted: 18,
    orgType: 'Hospital',
    licenseNumber: 'PHC-REG-2024-8921',
  });

  const [requests, setRequests] = useState<BloodRequest[]>(INITIAL_REQUESTS);
  const [alerts, setAlerts] = useState<AlertItem[]>(INITIAL_ALERTS);
  const [inventory, setInventory] = useState<InventoryItem[]>(INITIAL_INVENTORY);
  const [bloodBanks] = useState<BloodBank[]>(INITIAL_BLOOD_BANKS);
  const [donationHistory] = useState<DonationRecord[]>(INITIAL_DONATION_HISTORY);

  const activeRequest = requests[0];

  const login = (newRole?: UserRole) => {
    const selected = newRole || role;
    setRole(selected);
    setIsAuthenticated(true);
    if (selected === 'patient') {
      setProfile((prev) => ({
        ...prev,
        name: 'Tariq Mehmood',
        role: 'patient',
        refId: '#PT-88390',
        bloodGroup: 'B+',
      }));
    } else if (selected === 'donor') {
      setProfile((prev) => ({
        ...prev,
        name: 'Ali Raza',
        role: 'donor',
        refId: '#DNR-5821',
        bloodGroup: 'B+',
        donationsCompleted: 6,
        livesImpacted: 18,
      }));
    } else if (selected === 'hospital') {
      setProfile((prev) => ({
        ...prev,
        name: 'Shaukat Khanum Memorial Hospital',
        role: 'hospital',
        refId: '#HOSP-9482',
        orgType: 'Hospital',
        licenseNumber: 'PHC-REG-2024-8921',
      }));
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
  };

  const updateProfile = (updated: Partial<UserProfile>) => {
    setProfile((prev) => ({ ...prev, ...updated }));
  };

  const createRequest = (newReq: Partial<BloodRequest>): BloodRequest => {
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const req: BloodRequest = {
      id: `#REQ-${randomNum}`,
      patientName: profile.name,
      bloodGroup: newReq.bloodGroup || 'B+',
      units: newReq.units || 2,
      urgency: newReq.urgency || 'urgent',
      urgencyLabel:
        newReq.urgency === 'critical'
          ? 'Critical • Under 1 hr'
          : newReq.urgency === 'urgent'
          ? 'Needed in 2 hrs'
          : 'Standard • Within 24 hrs',
      hospital: newReq.hospital || 'Shaukat Khanum Memorial Hospital',
      department: 'Emergency Wing',
      address: newReq.address || 'Johar Town, Lahore',
      distance: '2.4 km',
      driveTime: '< 15 min drive',
      status: 'matching',
      donorsMatched: 0,
      donorsRequired: newReq.units || 2,
      createdAt: 'Just now',
      verificationToken: `#SK-${randomNum.toString().slice(0, 3)} • Certified`,
      phone: '1021',
    };

    setRequests((prev) => [req, ...prev]);

    // Add alert
    setAlerts((prev) => [
      {
        id: `alt-${Date.now()}`,
        title: `Requisition ${req.id} Created`,
        description: `Emergency broadcast active for ${req.units} units of ${req.bloodGroup}.`,
        category: 'requests',
        time: 'Just now',
        isUnread: true,
        badge: 'New Request',
        type: 'critical',
      },
      ...prev,
    ]);

    return req;
  };

  const updateRequestStatus = (id: string, status: RequestStatus) => {
    setRequests((prev) =>
      prev.map((r) =>
        r.id === id
          ? {
              ...r,
              status,
              donorsMatched:
                status === 'fulfilled'
                  ? r.donorsRequired
                  : status === 'partial'
                  ? 1
                  : status === 'matching'
                  ? 0
                  : r.donorsMatched,
            }
          : r
      )
    );
  };

  const toggleDonorAvailable = () => {
    setDonorAvailable((prev) => !prev);
  };

  const markAllAlertsRead = () => {
    setAlerts((prev) => prev.map((a) => ({ ...a, isUnread: false })));
  };

  const markAlertRead = (id: string) => {
    setAlerts((prev) => prev.map((a) => (a.id === id ? { ...a, isUnread: false } : a)));
  };

  const updateStock = (group: BloodGroup, delta: number) => {
    setInventory((prev) =>
      prev.map((item) => {
        if (item.group === group) {
          const newCount = Math.max(0, item.units + delta);
          return {
            ...item,
            units: newCount,
            status: newCount < 3 ? 'critical' : newCount < 6 ? 'low' : 'normal',
            lastUpdated: 'Just now',
          };
        }
        return item;
      })
    );
  };

  return (
    <AppContext.Provider
      value={{
        role,
        setRole,
        isAuthenticated,
        login,
        logout,
        profile,
        updateProfile,
        requests,
        activeRequest,
        createRequest,
        updateRequestStatus,
        donorAvailable,
        toggleDonorAvailable,
        alerts,
        markAllAlertsRead,
        markAlertRead,
        inventory,
        updateStock,
        bloodBanks,
        donationHistory,
        hospitalVerificationState,
        setHospitalVerificationState,
        acceptedOpportunityId,
        setAcceptedOpportunityId,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
