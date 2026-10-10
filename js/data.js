const DataStore = {
  STORAGE_KEY: 'votesecure_data',

  init() {
    const existing = localStorage.getItem(this.STORAGE_KEY);
    if (!existing) {
      const initialData = {
        elections: [
          {
            id: 'election-2026',
            title: 'Student Council Election 2026',
            description: 'Annual election for the Student Council executive board. All registered students are eligible to vote.',
            status: 'ongoing',
            startDate: '2026-10-01',
            endDate: '2026-10-15'
          },
          {
            id: 'election-2025',
            title: 'Student Council Election 2025',
            description: 'Previous year election for the Student Council executive board.',
            status: 'completed',
            startDate: '2025-10-01',
            endDate: '2025-10-15'
          }
        ],
        candidates: [
          {
            id: 'cand-2026-1',
            electionId: 'election-2026',
            name: 'Bikash Thapa',
            party: 'Independent',
            bio: 'Advocating for transparent student governance and improved campus facilities.',
            votes: 0
          },
          {
            id: 'cand-2026-2',
            electionId: 'election-2026',
            name: 'Ramesh Sharma',
            party: 'Progressive Party',
            bio: 'Committed to student welfare, academic reform, and inclusive representation.',
            votes: 0
          },
          {
            id: 'cand-2026-3',
            electionId: 'election-2026',
            name: 'Sita Rai',
            party: 'Unity Front',
            bio: 'Focused on unity, mental health support, and extracurricular opportunities.',
            votes: 0
          },
          {
            id: 'cand-2025-1',
            electionId: 'election-2025',
            name: 'Bikash Thapa',
            party: 'Independent',
            bio: 'Advocating for transparent student governance and improved campus facilities.',
            votes: 1247
          },
          {
            id: 'cand-2025-2',
            electionId: 'election-2025',
            name: 'Ramesh Sharma',
            party: 'Progressive Party',
            bio: 'Committed to student welfare, academic reform, and inclusive representation.',
            votes: 982
          },
          {
            id: 'cand-2025-3',
            electionId: 'election-2025',
            name: 'Sita Rai',
            party: 'Unity Front',
            bio: 'Focused on unity, mental health support, and extracurricular opportunities.',
            votes: 756
          }
        ],
        voters: [
          {
            id: 'voter-1',
            fullName: 'Nazir',
            email: 'nazir@gmail.com',
            citizenshipNumber: 'CIT-2026-001',
            district: 'Kathmandu',
            status: 'verified'
          },
          {
            id: 'voter-2',
            fullName: 'Varun',
            email: 'varun@gmail.com',
            citizenshipNumber: 'CIT-2026-002',
            district: 'Lalitpur',
            status: 'verified'
          },
          {
            id: 'voter-3',
            fullName: 'Sulav',
            email: 'sulav@gmail.com',
            citizenshipNumber: 'CIT-2026-003',
            district: 'Bhaktapur',
            status: 'verified'
          },
          {
            id: 'voter-4',
            fullName: 'Ritesh',
            email: 'ritesh@gmail.com',
            citizenshipNumber: 'CIT-2026-004',
            district: 'Kaski',
            status: 'verified'
          },
          {
            id: 'voter-5',
            fullName: 'Test2',
            email: 'test2@gmail.com',
            citizenshipNumber: 'CIT-2026-005',
            district: 'Morang',
            status: 'verified'
          },
          {
            id: 'voter-6',
            fullName: 'Deepak Shah',
            email: 'deepak.shah@example.com',
            citizenshipNumber: 'CIT-2026-006',
            district: 'Rupandehi',
            status: 'pending'
          },
          {
            id: 'voter-7',
            fullName: 'Meera Tamang',
            email: 'meera.tamang@example.com',
            citizenshipNumber: 'CIT-2026-007',
            district: 'Sindhupalchok',
            status: 'pending'
          },
          {
            id: 'voter-8',
            fullName: 'Bishnu Pradhan',
            email: 'bishnu.pradhan@example.com',
            citizenshipNumber: 'CIT-2026-008',
            district: 'Chitwan',
            status: 'pending'
          }
        ],
        votes: {}
      };
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(initialData));
    } else {
      const data = JSON.parse(existing);
      let updated = false;
      if (!data.elections) { data.elections = []; updated = true; }
      if (!data.candidates) { data.candidates = []; updated = true; }
      if (!data.voters) { 
        data.voters = [
          { id: 'voter-1', fullName: 'Nazir', email: 'nazir@gmail.com', citizenshipNumber: 'CIT-2026-001', district: 'Kathmandu', status: 'verified' },
          { id: 'voter-2', fullName: 'Varun', email: 'varun@gmail.com', citizenshipNumber: 'CIT-2026-002', district: 'Lalitpur', status: 'verified' },
          { id: 'voter-3', fullName: 'Sulav', email: 'sulav@gmail.com', citizenshipNumber: 'CIT-2026-003', district: 'Bhaktapur', status: 'verified' },
          { id: 'voter-4', fullName: 'Ritesh', email: 'ritesh@gmail.com', citizenshipNumber: 'CIT-2026-004', district: 'Kaski', status: 'verified' },
          { id: 'voter-5', fullName: 'Test2', email: 'test2@gmail.com', citizenshipNumber: 'CIT-2026-005', district: 'Morang', status: 'verified' },
          { id: 'voter-6', fullName: 'Deepak Shah', email: 'deepak.shah@example.com', citizenshipNumber: 'CIT-2026-006', district: 'Rupandehi', status: 'pending' },
          { id: 'voter-7', fullName: 'Meera Tamang', email: 'meera.tamang@example.com', citizenshipNumber: 'CIT-2026-007', district: 'Sindhupalchok', status: 'pending' },
          { id: 'voter-8', fullName: 'Bishnu Pradhan', email: 'bishnu.pradhan@example.com', citizenshipNumber: 'CIT-2026-008', district: 'Chitwan', status: 'pending' }
        ]; 
        updated = true; 
      }
      const voterProfileUpdates = {
        'voter-1': { fullName: 'Nazir', email: 'nazir@gmail.com' },
        'voter-2': { fullName: 'Varun', email: 'varun@gmail.com' },
        'voter-3': { fullName: 'Sulav', email: 'sulav@gmail.com' },
        'voter-4': { fullName: 'Ritesh', email: 'ritesh@gmail.com' },
        'voter-5': { fullName: 'Test2', email: 'test2@gmail.com' }
      };
      data.voters.forEach(voter => {
        const update = voterProfileUpdates[voter.id];
        if (update && (voter.fullName !== update.fullName || voter.email !== update.email)) {
          voter.fullName = update.fullName;
          voter.email = update.email;
          updated = true;
        }
      });
      if (!data.votes) { data.votes = {}; updated = true; }
      if (updated) this.saveData(data);
    }
  },

  getData() {
    this.init();
    return JSON.parse(localStorage.getItem(this.STORAGE_KEY));
  },

  saveData(data) {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(data));
  },

  getElections() {
    return this.getData().elections;
  },

  getElectionById(id) {
    return this.getData().elections.find(e => e.id === id);
  },

  getCandidatesByElection(electionId) {
    return this.getData().candidates.filter(c => c.electionId === electionId);
  },

  getCandidateById(id) {
    return this.getData().candidates.find(c => c.id === id);
  },

  hasVoted(voterEmail, electionId) {
    const data = this.getData();
    const key = `${voterEmail}:${electionId}`;
    return !!data.votes[key];
  },

  castVote(voterEmail, electionId, candidateId) {
    const data = this.getData();
    const key = `${voterEmail}:${electionId}`;

    if (data.votes[key]) {
      return { success: false, message: 'You have already voted in this election.' };
    }

    const candidate = data.candidates.find(c => c.id === candidateId);
    if (!candidate || candidate.electionId !== electionId) {
      return { success: false, message: 'Invalid candidate.' };
    }

    const election = data.elections.find(e => e.id === electionId);
    if (!election || election.status !== 'ongoing') {
      return { success: false, message: 'This election is not currently accepting votes.' };
    }

    const voter = data.voters.find(v => v.email === voterEmail);
    const voterName = voter ? voter.fullName : voterEmail.split('@')[0];

    candidate.votes += 1;
    data.votes[key] = {
      voterEmail,
      voterName,
      candidateId,
      candidateName: candidate.name,
      electionId,
      electionTitle: election.title,
      timestamp: new Date().toISOString()
    };

    this.saveData(data);
    return { success: true, message: 'Vote cast successfully!' };
  },

  getVoterHistory(voterEmail) {
    const data = this.getData();
    const history = [];
    Object.entries(data.votes).forEach(([key, vote]) => {
      const [email, electionId] = key.split(':');
      if (email === voterEmail) {
        const election = data.elections.find(e => e.id === electionId);
        const candidate = data.candidates.find(c => c.id === vote.candidateId);
        if (election && candidate) {
          history.push({
            electionId,
            electionTitle: election.title,
            candidateName: candidate.name,
            candidateParty: candidate.party,
            timestamp: vote.timestamp
          });
        }
      }
    });
    return history.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
  },

  getElectionResults(electionId) {
    const candidates = this.getCandidatesByElection(electionId);
    const totalVotes = candidates.reduce((sum, c) => sum + c.votes, 0);
    return candidates.map(c => ({
      ...c,
      percentage: totalVotes > 0 ? ((c.votes / totalVotes) * 100).toFixed(1) : '0.0'
    })).sort((a, b) => b.votes - a.votes);
  },

  getVoters() {
    return this.getData().voters;
  },

  getVoterById(id) {
    return this.getData().voters.find(v => v.id === id);
  },

  getVerifiedVoters() {
    return this.getData().voters.filter(v => v.status === 'verified');
  },

  getPendingVoters() {
    return this.getData().voters.filter(v => v.status === 'pending');
  },

  verifyVoter(id) {
    const data = this.getData();
    const voter = data.voters.find(v => v.id === id);
    if (voter) {
      voter.status = 'verified';
      this.saveData(data);
      return { success: true };
    }
    return { success: false, message: 'Voter not found' };
  },

  removeVoter(id) {
    const data = this.getData();
    const index = data.voters.findIndex(v => v.id === id);
    if (index !== -1) {
      data.voters.splice(index, 1);
      this.saveData(data);
      return { success: true };
    }
    return { success: false, message: 'Voter not found' };
  },

  getRecentVotes(limit = 10) {
    const data = this.getData();
    const votes = [];
    Object.entries(data.votes).forEach(([key, vote]) => {
      if (vote.voterName && vote.candidateName) {
        votes.push({
          voterName: vote.voterName,
          voterEmail: vote.voterEmail,
          candidateName: vote.candidateName,
          electionTitle: vote.electionTitle,
          timestamp: vote.timestamp
        });
      } else {
        const [email, electionId] = key.split(':');
        const voter = data.voters.find(v => v.email === email);
        const candidate = data.candidates.find(c => c.id === vote.candidateId);
        const election = data.elections.find(e => e.id === electionId);
        if (voter && candidate && election) {
          votes.push({
            voterName: voter.fullName,
            voterEmail: email,
            candidateName: candidate.name,
            electionTitle: election.title,
            timestamp: vote.timestamp
          });
        }
      }
    });
    return votes.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)).slice(0, limit);
  },

  addCandidate(candidateData) {
    const data = this.getData();
    const newCandidate = {
      id: `cand-${Date.now()}`,
      electionId: candidateData.electionId,
      name: candidateData.name,
      party: candidateData.party,
      bio: candidateData.bio || '',
      votes: 0
    };
    data.candidates.push(newCandidate);
    this.saveData(data);
    return { success: true, candidate: newCandidate };
  },

  removeCandidate(id) {
    const data = this.getData();
    const index = data.candidates.findIndex(c => c.id === id);
    if (index !== -1) {
      data.candidates.splice(index, 1);
      this.saveData(data);
      return { success: true };
    }
    return { success: false, message: 'Candidate not found' };
  },

  addElection(electionData) {
    const data = this.getData();
    const newElection = {
      id: `election-${Date.now()}`,
      title: electionData.title,
      description: electionData.description || '',
      status: 'upcoming',
      startDate: electionData.startDate,
      endDate: electionData.endDate
    };
    data.elections.push(newElection);
    this.saveData(data);
    return { success: true, election: newElection };
  },

  updateElectionStatus(id, newStatus) {
    const data = this.getData();
    const election = data.elections.find(e => e.id === id);
    if (election) {
      election.status = newStatus;
      this.saveData(data);
      return { success: true, election };
    }
    return { success: false, message: 'Election not found' };
  },

  removeElection(id) {
    const data = this.getData();
    const index = data.elections.findIndex(e => e.id === id);
    if (index !== -1) {
      data.elections.splice(index, 1);
      data.candidates = data.candidates.filter(c => c.electionId !== id);
      this.saveData(data);
      return { success: true };
    }
    return { success: false, message: 'Election not found' };
  },

  addVoter(voterData) {
    const data = this.getData();
    const newVoter = {
      id: `voter-${Date.now()}`,
      fullName: voterData.fullName,
      email: voterData.email,
      citizenshipNumber: voterData.citizenshipNumber,
      district: voterData.district,
      status: voterData.status || 'pending'
    };
    data.voters.push(newVoter);
    this.saveData(data);
    return { success: true, voter: newVoter };
  }
};

DataStore.init();