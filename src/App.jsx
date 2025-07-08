import { BrowserRouter as Router, Routes, Route } from 'react-router';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Topics from './pages/Topics';
import SortingList from './pages/Sorting/SortingList';
import BubbleSort from './pages/Sorting/BubbleSort';
import SelectionSort from './pages/Sorting/SelectionSort';
import InsertionSort from './pages/Sorting/InsertionSort';
import MergeSort from './pages/Sorting/MergeSort';
import QuickSort from './pages/Sorting/QuickSort';
import HeapSort from './pages/Sorting/HeapSort';
import CountingSort from './pages/Sorting/CountingSort';
import RadixSort from './pages/Sorting/RadixSort';
import ArraySubtopics from './pages/Arrays/ArraySubtopics';
import ArrayBasics from './pages/Arrays/ArrayBasics';
import ArraySearching from './pages/Arrays/ArraySearching.jsx';
import LinearSearch from './pages/Arrays/Searching/LinearSearch.jsx';
import BinarySearch from './pages/Arrays/Searching/BinarySearch.jsx';
import ArrayOperations from './pages/Arrays/operations/ArrayOperations.jsx';
import InsertBegin from './pages/Arrays/operations/Insertion/InsertBegin.jsx';
import InsertEnd from './pages/Arrays/operations/Insertion/InsertEnd.jsx';
import InsertIndex from './pages/Arrays/operations/Insertion/InsertIndex.jsx';
import DeleteBegin from './pages/Arrays/operations/Deletion/DeleteBegin.jsx';
import DeleteEnd from './pages/Arrays/operations/Deletion/DeleteEnd.jsx';
import DeleteIndex from './pages/Arrays/operations/Deletion/DeleteIndex.jsx';
import ForwardTraversal from './pages/Arrays/operations/Traversal/ForwardTraversal.jsx';
import BackwardTraversal from './pages/Arrays/operations/Traversal/BackwardTraversal.jsx';
import UpdateAtindex from './pages/Arrays/operations/Traversal/UpdateAtIndex.jsx';
import LeftRotate from './pages/Arrays/operations/Rotate/LeftRotate.jsx';
import RightRotate from './pages/Arrays/operations/Rotate/RightRotate.jsx';
import ReverseArray from './pages/Arrays/operations/Rotate/ReverseArray.jsx';
import FindMaxMin from './pages/Arrays/operations/Miscellaneous/FindMaxMin.jsx';
import CountFrequency from './pages/Arrays/operations/Miscellaneous/CountFrequency.jsx';
import SubarraySum from './pages/Arrays/operations/Miscellaneous/SubarraySum.jsx';
import AIHelp from './pages/AIHelp.jsx';


function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ai-help" element={<AIHelp />} />
        <Route path="/topics" element={<Topics />} />
        <Route path="/sortinglist" element={<SortingList />} />
        <Route path="/sorting/bubble" element={<BubbleSort/>}/>
        <Route path="/sorting/selection"element={<SelectionSort/>}/>
        <Route path="/sorting/insertion"element={<InsertionSort/>}/>
        <Route path="/sorting/merge"element={<MergeSort/>}/>
        <Route path="/sorting/quick"element={<QuickSort/>}/>
        <Route path="/sorting/heap"element={<HeapSort/>}/>
        <Route path="/sorting/counting"element={<CountingSort/>}/>
        <Route path="/sorting/radix"element={<RadixSort/>}/>
        <Route path="/arrays"element={<ArraySubtopics/>}/>
        <Route path="/arrays/basics"element={<ArrayBasics/>}/>
        <Route path="/arrays/searching"element={<ArraySearching/>}/>
        <Route path="/array/searching/linear" element={<LinearSearch />} />
        <Route path="/array/searching/binary" element={<BinarySearch />} />
        <Route path="/arrays/operations" element={<ArrayOperations />} />
        <Route path="/arrays/operations/insert-begin" element={<InsertBegin />} />
        <Route path="/arrays/operations/insert-end" element={<InsertEnd />} />
        <Route path="/arrays/operations/insert-index" element={<InsertIndex />} />
        <Route path="/arrays/operations/delete-begin" element={<DeleteBegin />} />
        <Route path="/arrays/operations/delete-end" element={<DeleteEnd />} />
        <Route path="/arrays/operations/delete-index" element={<DeleteIndex />} />
        <Route path="/arrays/operations/traverse-forward" element={<ForwardTraversal />} />
        <Route path="/arrays/operations/traverse-reverse" element={<BackwardTraversal />} />
        <Route path="/arrays/operations/update-index" element={<UpdateAtindex />} />
        <Route path="/arrays/operations/left-rotate" element={<LeftRotate />} />
        <Route path="/arrays/operations/right-rotate" element={<RightRotate />} />
        <Route path="/arrays/operations/reverse" element={<ReverseArray />} />
        <Route path="/arrays/operations/max-min" element={<FindMaxMin />} />
        <Route path="/arrays/operations/frequency" element={<CountFrequency />} />
        <Route path="/arrays/operations/subarray-sum" element={<SubarraySum />} />


        {/* Other routes will go here later */}
      </Routes>
    </Router>
  );
}

export default App;
