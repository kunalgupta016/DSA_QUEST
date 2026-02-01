import { BrowserRouter as Router, Routes, Route } from "react-router";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Topics from "./pages/Topics";
import SortingList from "./pages/Sorting/SortingList";
import BubbleSort from "./pages/Sorting/BubbleSort";
import SelectionSort from "./pages/Sorting/SelectionSort";
import InsertionSort from "./pages/Sorting/InsertionSort";
import MergeSort from "./pages/Sorting/MergeSort";
import QuickSort from "./pages/Sorting/QuickSort";
import HeapSort from "./pages/Sorting/HeapSort";
import CountingSort from "./pages/Sorting/CountingSort";
import RadixSort from "./pages/Sorting/RadixSort";
import ArraySubtopics from "./pages/Arrays/ArraySubtopics";
import ArrayBasics from "./pages/Arrays/ArrayBasics";
import ArraySearching from "./pages/Arrays/ArraySearching.jsx";
import LinearSearch from "./pages/Arrays/Searching/LinearSearch.jsx";
import BinarySearch from "./pages/Arrays/Searching/BinarySearch.jsx";
import ArrayOperations from "./pages/Arrays/operations/ArrayOperations.jsx";
import InsertBegin from "./pages/Arrays/operations/Insertion/InsertBegin.jsx";
import InsertEnd from "./pages/Arrays/operations/Insertion/InsertEnd.jsx";
import InsertIndex from "./pages/Arrays/operations/Insertion/InsertIndex.jsx";
import DeleteBegin from "./pages/Arrays/operations/Deletion/DeleteBegin.jsx";
import DeleteEnd from "./pages/Arrays/operations/Deletion/DeleteEnd.jsx";
import DeleteIndex from "./pages/Arrays/operations/Deletion/DeleteIndex.jsx";
import ForwardTraversal from "./pages/Arrays/operations/Traversal/ForwardTraversal.jsx";
import BackwardTraversal from "./pages/Arrays/operations/Traversal/BackwardTraversal.jsx";
import UpdateAtindex from "./pages/Arrays/operations/Traversal/UpdateAtIndex.jsx";
import LeftRotate from "./pages/Arrays/operations/Rotate/LeftRotate.jsx";
import RightRotate from "./pages/Arrays/operations/Rotate/RightRotate.jsx";
import ReverseArray from "./pages/Arrays/operations/Rotate/ReverseArray.jsx";
import FindMaxMin from "./pages/Arrays/operations/Miscellaneous/FindMaxMin.jsx";
import CountFrequency from "./pages/Arrays/operations/Miscellaneous/CountFrequency.jsx";
import SubarraySum from "./pages/Arrays/operations/Miscellaneous/SubarraySum.jsx";

import AIHelp from "./pages/AIHelp.jsx";

// Stacks
import StackMenu from "./pages/Stacks/StackMenu.jsx";
import StackOperations from "./pages/Stacks/StackOperations.jsx";
import StackBasics from "./pages/Stacks/StackBasics.jsx";
import StackPush from "./pages/Stacks/operations/StackPush.jsx";
import StackPop from "./pages/Stacks/operations/StackPop.jsx";
import StackPeek from "./pages/Stacks/operations/StackPeek.jsx";
import StackChallenges from "./pages/Stacks/StackChallenges.jsx";
import ValidParentheses from "./pages/Stacks/challenges/ValidParentheses.jsx";
import ReverseString from "./pages/Stacks/challenges/ReverseString.jsx";
import MinStack from "./pages/Stacks/challenges/MinStack.jsx";

// Queues
import QueueMenu from "./pages/Queues/QueueMenu.jsx";
import QueueOperations from "./pages/Queues/QueueOperations.jsx";
import QueueBasics from "./pages/Queues/QueueBasics.jsx";
import QueueEnqueue from "./pages/Queues/operations/QueueEnqueue.jsx";
import QueueDequeue from "./pages/Queues/operations/QueueDequeue.jsx";
import QueueFront from "./pages/Queues/operations/QueueFront.jsx";
import QueueChallenges from "./pages/Queues/QueueChallenges.jsx";
import GenerateBinary from "./pages/Queues/challenges/GenerateBinary.jsx";
import SlidingWindowMax from "./pages/Queues/challenges/SlidingWindowMax.jsx";
import StackUsingQueue from "./pages/Queues/challenges/StackUsingQueue.jsx";

// Linked Lists
import LinkedListMenu from "./pages/LinkedLists/LinkedListMenu.jsx";
import LinkedListOperations from "./pages/LinkedLists/LinkedListOperations.jsx";
import LinkedListBasics from "./pages/LinkedLists/LinkedListBasics.jsx";
import LLInsertHead from "./pages/LinkedLists/operations/LLInsertHead.jsx";
import LLInsertTail from "./pages/LinkedLists/operations/LLInsertTail.jsx";
import LLDeleteHead from "./pages/LinkedLists/operations/LLDeleteHead.jsx";
import LLDeleteTail from "./pages/LinkedLists/operations/LLDeleteTail.jsx";
import LLChallenges from "./pages/LinkedLists/LLChallenges.jsx";
import StartCycle from "./pages/LinkedLists/challenges/StartCycle.jsx";
import ReverseList from "./pages/LinkedLists/challenges/ReverseList.jsx";
import MergeSorted from "./pages/LinkedLists/challenges/MergeSorted.jsx";

// Trees
import TreeMenu from "./pages/Trees/TreeMenu.jsx";
import TreeOperations from "./pages/Trees/TreeOperations.jsx";
import TreeBasics from "./pages/Trees/TreeBasics.jsx";
import TreeInsert from "./pages/Trees/operations/TreeInsert.jsx";
import TreeTraversal from "./pages/Trees/operations/TreeTraversal.jsx";
import TreeVisualizer from "./pages/Trees/TreeVisualizer.jsx";
import TreeChallenges from "./pages/Trees/TreeChallenges.jsx";
import MaxDepth from "./pages/Trees/challenges/MaxDepth.jsx";
import InvertTree from "./pages/Trees/challenges/InvertTree.jsx";
import SymmetricTree from "./pages/Trees/challenges/SymmetricTree.jsx";

// Graphs
import GraphMenu from "./pages/Graphs/GraphMenu.jsx";
import GraphVisualizer from "./pages/Graphs/GraphVisualizer.jsx";
import Dijkstra from "./pages/Graphs/operations/Dijkstra.jsx";
import BellmanFord from "./pages/Graphs/operations/BellmanFord.jsx";
import FloydWarshall from "./pages/Graphs/operations/FloydWarshall.jsx";
import TopologicalSort from "./pages/Graphs/operations/TopologicalSort.jsx";
import Kosaraju from "./pages/Graphs/operations/Kosaraju.jsx";
import GraphOperations from "./pages/Graphs/GraphOperations.jsx";
import GraphBasics from "./pages/Graphs/GraphBasics.jsx";
import GraphBFS from "./pages/Graphs/operations/GraphBFS.jsx";
import GraphDFS from "./pages/Graphs/operations/GraphDFS.jsx";
import GraphChallenges from "./pages/Graphs/GraphChallenges.jsx";
import FindPath from "./pages/Graphs/challenges/FindPath.jsx";
import NumIslands from "./pages/Graphs/challenges/NumIslands.jsx";
import CloneGraph from "./pages/Graphs/challenges/CloneGraph.jsx";

// Math & Logical
import MathLogicalMenu from "./pages/Arrays/MathLogical/MathLogicalMenu.jsx";
import TwoDArrayMenu from "./pages/Arrays/TwoDArrays/TwoDArrayMenu.jsx";
import CheckPrime from "./pages/Arrays/MathLogical/components/CheckPrime.jsx";
import GCD from "./pages/Arrays/MathLogical/components/GCD.jsx";
import Sieve from "./pages/Arrays/MathLogical/components/Sieve.jsx";
import CheckSorted from "./pages/Arrays/MathLogical/components/CheckSorted.jsx";
import SecondLargest from "./pages/Arrays/MathLogical/components/SecondLargest.jsx";
import RotateArrayK from "./pages/Arrays/MathLogical/components/RotateArrayK.jsx";
import RemoveDuplicatesSorted from "./pages/Arrays/MathLogical/components/RemoveDuplicatesSorted.jsx";
import Kadane from "./pages/Arrays/MathLogical/components/Kadane.jsx";
import SearchRotated from "./pages/Arrays/MathLogical/components/SearchRotated.jsx";
import TwoSum from "./pages/Arrays/MathLogical/components/TwoSum.jsx";
import MajorityElementN2 from "./pages/Arrays/MathLogical/components/MajorityElementN2.jsx";
import LogicalBinarySearch from "./pages/Arrays/MathLogical/components/BinarySearch.jsx";
import MergeSortedArrays from "./pages/Arrays/MathLogical/components/MergeSortedArrays.jsx";
import MissingNumber from "./pages/Arrays/MathLogical/components/MissingNumber.jsx";
import IntersectionArrays from "./pages/Arrays/MathLogical/components/IntersectionArrays.jsx";
import ContainerMostWater from "./pages/Arrays/MathLogical/components/ContainerMostWater.jsx";
import TrappingRainWater from "./pages/Arrays/MathLogical/components/TrappingRainWater.jsx";
import MajorityElementN3 from "./pages/Arrays/MathLogical/components/MajorityElementN3.jsx";
import UnionArrays from "./pages/Arrays/MathLogical/components/UnionArrays.jsx";
import LongestSubarrayZero from "./pages/Arrays/MathLogical/components/LongestSubarrayZero.jsx";
import FirstLastOccurrence from "./pages/Arrays/MathLogical/components/FirstLastOccurrence.jsx";
import FirstNonRepeating from "./pages/Arrays/MathLogical/components/FirstNonRepeating.jsx";
import OddOccurrence from "./pages/Arrays/MathLogical/components/OddOccurrence.jsx";
import ThreeSum from "./pages/Arrays/MathLogical/components/ThreeSum.jsx";
import CountSubarrayLessK from "./pages/Arrays/MathLogical/components/CountSubarrayLessK.jsx";
import ReverseNumber from "./pages/Arrays/MathLogical/components/ReverseNumber.jsx";
import PalindromeNumber from "./pages/Arrays/MathLogical/components/PalindromeNumber.jsx";
import ArmstrongNumber from "./pages/Arrays/MathLogical/components/ArmstrongNumber.jsx";
import CountDigits from "./pages/Arrays/MathLogical/components/CountDigits.jsx";
import SumDigits from "./pages/Arrays/MathLogical/components/SumDigits.jsx";
import PowerOfTwo from "./pages/Arrays/MathLogical/components/PowerOfTwo.jsx";
import PowerOf3 from "./pages/Arrays/MathLogical/components/PowerOf3.jsx";
import BinaryToDecimal from "./pages/Arrays/MathLogical/components/BinaryToDecimal.jsx";
import DecimalToBinary from "./pages/Arrays/MathLogical/components/DecimalToBinary.jsx";
import DuplicateXOR from "./pages/Arrays/MathLogical/components/DuplicateXOR.jsx";
import LCM from "./pages/Arrays/MathLogical/components/LCM.jsx";
import CheckCoPrime from "./pages/Arrays/MathLogical/components/CheckCoPrime.jsx";
import PowerVisualizer from "./pages/Arrays/MathLogical/components/PowerVisualizer.jsx";
import TrailingZeros from "./pages/Arrays/MathLogical/components/TrailingZeros.jsx";
import ClockAngle from "./pages/Arrays/MathLogical/components/ClockAngle.jsx";
import SpeedTimeDistance from "./pages/Arrays/MathLogical/components/SpeedTimeDistance.jsx";

import RemoveDuplicatesUnsorted from "./pages/Arrays/MathLogical/components/RemoveDuplicatesUnsorted.jsx";
import DuplicateNumber from "./pages/Arrays/MathLogical/components/DuplicateNumber.jsx";
import MissingRepeating from "./pages/Arrays/MathLogical/components/MissingRepeating.jsx";

// 2D Arrays
import MatrixTraversal from "./pages/Arrays/TwoDArrays/components/MatrixTraversal.jsx";
import WavePrint from "./pages/Arrays/TwoDArrays/components/WavePrint.jsx";
import SpiralMatrix from "./pages/Arrays/TwoDArrays/components/SpiralMatrix.jsx";
import TransposeMatrix from "./pages/Arrays/TwoDArrays/components/TransposeMatrix.jsx";
import RotateMatrix90 from "./pages/Arrays/TwoDArrays/components/RotateMatrix90.jsx";
import SearchMatrix1 from "./pages/Arrays/TwoDArrays/components/SearchMatrix1.jsx";
import SearchMatrix2 from "./pages/Arrays/TwoDArrays/components/SearchMatrix2.jsx";

// Pointers
import PointerMenu from "./pages/Pointers/PointerMenu.jsx";
import PointerBasics from "./pages/Pointers/PointerBasics.jsx";
import DoublePointers from "./pages/Pointers/DoublePointers.jsx";
import PointerFunctions from "./pages/Pointers/PointerFunctions.jsx";
import PointerPractice from "./pages/Pointers/PointerPractice.jsx";
import GameHome from "./pages/Game/GameHome.jsx";
import ArrayGameMap from "./pages/Game/Arrays/ArrayGameMap.jsx";
import Level1 from "./pages/Game/Arrays/levels/Level1.jsx";
import Level2 from "./pages/Game/Arrays/levels/Level2.jsx";
import Level3 from "./pages/Game/Arrays/levels/Level3.jsx";
import Level4 from "./pages/Game/Arrays/levels/Level4.jsx";
import Level5 from "./pages/Game/Arrays/levels/Level5.jsx";
import Level6 from "./pages/Game/Arrays/levels/Level6.jsx";
import Level7 from "./pages/Game/Arrays/levels/Level7.jsx";
import Level8 from "./pages/Game/Arrays/levels/Level8.jsx";
import Level9 from "./pages/Game/Arrays/levels/Level9.jsx";
import Level10 from "./pages/Game/Arrays/levels/Level10.jsx";
import ArrayModeSelection from "./pages/Game/Arrays/ArrayModeSelection.jsx";
import ArrayCodeMap from "./pages/Game/Arrays/ArrayCodeMap.jsx";
import Level1Code from "./pages/Game/Arrays/CodeLevels/Level1Code.jsx";
import Level2Code from "./pages/Game/Arrays/CodeLevels/Level2Code.jsx";
import Level3Code from "./pages/Game/Arrays/CodeLevels/Level3Code.jsx";
import Level4Code from "./pages/Game/Arrays/CodeLevels/Level4Code.jsx";
import Level5Code from "./pages/Game/Arrays/CodeLevels/Level5Code.jsx";
import Level6Code from "./pages/Game/Arrays/CodeLevels/Level6Code.jsx";
import Level7Code from "./pages/Game/Arrays/CodeLevels/Level7Code.jsx";
import Level8Code from "./pages/Game/Arrays/CodeLevels/Level8Code.jsx";
import Level9Code from "./pages/Game/Arrays/CodeLevels/Level9Code.jsx";
import Level10Code from "./pages/Game/Arrays/CodeLevels/Level10Code.jsx";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ai-help" element={<AIHelp />} />
        <Route path="/game" element={<GameHome />} />

        {/* Array Game Sub-Routes */}
        <Route path="/game/arrays" element={<ArrayModeSelection />} />
        <Route path="/game/arrays/visual" element={<ArrayGameMap />} />
        <Route path="/game/arrays/code" element={<ArrayCodeMap />} />

        {/* Visual Levels */}
        <Route path="/game/arrays/1" element={<Level1 />} />
        <Route path="/game/arrays/2" element={<Level2 />} />
        <Route path="/game/arrays/3" element={<Level3 />} />
        <Route path="/game/arrays/4" element={<Level4 />} />
        <Route path="/game/arrays/5" element={<Level5 />} />
        <Route path="/game/arrays/6" element={<Level6 />} />
        <Route path="/game/arrays/7" element={<Level7 />} />
        <Route path="/game/arrays/8" element={<Level8 />} />
        <Route path="/game/arrays/9" element={<Level9 />} />
        <Route path="/game/arrays/10" element={<Level10 />} />

        {/* Code Levels */}
        <Route path="/game/arrays/code/1" element={<Level1Code />} />
        <Route path="/game/arrays/code/2" element={<Level2Code />} />
        <Route path="/game/arrays/code/3" element={<Level3Code />} />
        <Route path="/game/arrays/code/4" element={<Level4Code />} />
        <Route path="/game/arrays/code/5" element={<Level5Code />} />
        <Route path="/game/arrays/code/6" element={<Level6Code />} />
        <Route path="/game/arrays/code/7" element={<Level7Code />} />
        <Route path="/game/arrays/code/8" element={<Level8Code />} />
        <Route path="/game/arrays/code/9" element={<Level9Code />} />
        <Route path="/game/arrays/code/10" element={<Level10Code />} />

        <Route path="/topics" element={<Topics />} />

        {/* Sorting */}
        <Route path="/sortinglist" element={<SortingList />} />
        <Route path="/sorting/bubble" element={<BubbleSort />} />
        <Route path="/sorting/selection" element={<SelectionSort />} />
        <Route path="/sorting/insertion" element={<InsertionSort />} />
        <Route path="/sorting/merge" element={<MergeSort />} />
        <Route path="/sorting/quick" element={<QuickSort />} />
        <Route path="/sorting/heap" element={<HeapSort />} />
        <Route path="/sorting/counting" element={<CountingSort />} />
        <Route path="/sorting/radix" element={<RadixSort />} />

        {/* Arrays */}
        <Route path="/arrays" element={<ArraySubtopics />} />
        <Route path="/arrays/basics" element={<ArrayBasics />} />
        <Route path="/arrays/searching" element={<ArraySearching />} />
        <Route path="/array/searching/linear" element={<LinearSearch />} />
        <Route path="/array/searching/binary" element={<BinarySearch />} />
        <Route path="/arrays/operations" element={<ArrayOperations />} />
        <Route
          path="/arrays/operations/insert-begin"
          element={<InsertBegin />}
        />
        <Route path="/arrays/operations/insert-end" element={<InsertEnd />} />
        <Route
          path="/arrays/operations/insert-index"
          element={<InsertIndex />}
        />
        <Route
          path="/arrays/operations/delete-begin"
          element={<DeleteBegin />}
        />
        <Route path="/arrays/operations/delete-end" element={<DeleteEnd />} />
        <Route
          path="/arrays/operations/delete-index"
          element={<DeleteIndex />}
        />
        <Route
          path="/arrays/operations/traverse-forward"
          element={<ForwardTraversal />}
        />
        <Route
          path="/arrays/operations/traverse-reverse"
          element={<BackwardTraversal />}
        />
        <Route
          path="/arrays/operations/update-index"
          element={<UpdateAtindex />}
        />
        <Route path="/arrays/operations/left-rotate" element={<LeftRotate />} />
        <Route
          path="/arrays/operations/right-rotate"
          element={<RightRotate />}
        />
        <Route path="/arrays/operations/reverse" element={<ReverseArray />} />
        <Route path="/arrays/operations/max-min" element={<FindMaxMin />} />
        <Route
          path="/arrays/operations/frequency"
          element={<CountFrequency />}
        />
        <Route
          path="/arrays/operations/subarray-sum"
          element={<SubarraySum />}
        />

        {/* Stacks */}
        <Route path="/stacks" element={<StackMenu />} />
        <Route path="/stacks/basics" element={<StackBasics />} />
        <Route path="/stacks/operations" element={<StackOperations />} />
        <Route path="/stacks/operations/push" element={<StackPush />} />
        <Route path="/stacks/operations/pop" element={<StackPop />} />
        <Route path="/stacks/operations/peek" element={<StackPeek />} />
        <Route path="/stacks/challenges" element={<StackChallenges />} />
        <Route
          path="/stacks/challenges/valid-parentheses"
          element={<ValidParentheses />}
        />
        <Route
          path="/stacks/challenges/reverse-string"
          element={<ReverseString />}
        />
        <Route path="/stacks/challenges/min-stack" element={<MinStack />} />

        {/* Queues */}
        <Route path="/queues" element={<QueueMenu />} />
        <Route path="/queues/basics" element={<QueueBasics />} />
        <Route path="/queues/operations" element={<QueueOperations />} />
        <Route path="/queues/operations/enqueue" element={<QueueEnqueue />} />
        <Route path="/queues/operations/dequeue" element={<QueueDequeue />} />
        <Route path="/queues/operations/front" element={<QueueFront />} />
        <Route path="/queues/challenges" element={<QueueChallenges />} />
        <Route
          path="/queues/challenges/generate-binary"
          element={<GenerateBinary />}
        />
        <Route
          path="/queues/challenges/sliding-window"
          element={<SlidingWindowMax />}
        />
        <Route
          path="/queues/challenges/stack-using-queue"
          element={<StackUsingQueue />}
        />

        {/* Linked Lists */}
        <Route path="/linkedlist" element={<LinkedListMenu />} />
        <Route path="/linkedlist/basics" element={<LinkedListBasics />} />
        <Route
          path="/linkedlist/operations"
          element={<LinkedListOperations />}
        />
        <Route
          path="/linkedlist/operations/insert-head"
          element={<LLInsertHead />}
        />
        <Route
          path="/linkedlist/operations/insert-tail"
          element={<LLInsertTail />}
        />
        <Route
          path="/linkedlist/operations/delete-head"
          element={<LLDeleteHead />}
        />
        <Route
          path="/linkedlist/operations/delete-tail"
          element={<LLDeleteTail />}
        />
        <Route path="/linkedlist/challenges" element={<LLChallenges />} />
        <Route
          path="/linkedlist/challenges/detect-cycle"
          element={<StartCycle />}
        />
        <Route
          path="/linkedlist/operations/reverse"
          element={<ReverseList />}
        />
        <Route
          path="/linkedlist/challenges/merge-sorted"
          element={<MergeSorted />}
        />

        {/* Visualizers */}
        <Route path="/visualizer/trees" element={<TreeVisualizer />} />
        <Route path="/visualizer/graphs" element={<GraphVisualizer />} />

        {/* Graphs Algorithms */}
        <Route path="/graphs/operations/dijkstra" element={<Dijkstra />} />
        <Route
          path="/graphs/operations/bellman-ford"
          element={<BellmanFord />}
        />
        <Route
          path="/graphs/operations/floyd-warshall"
          element={<FloydWarshall />}
        />
        <Route
          path="/graphs/operations/topo-sort"
          element={<TopologicalSort />}
        />
        <Route path="/graphs/operations/kosaraju" element={<Kosaraju />} />

        {/* Trees */}
        <Route path="/trees" element={<TreeMenu />} />
        <Route path="/trees/basics" element={<TreeBasics />} />
        <Route path="/trees/operations" element={<TreeOperations />} />
        <Route path="/trees/operations/insert" element={<TreeInsert />} />
        <Route path="/trees/operations/traversal" element={<TreeTraversal />} />
        <Route path="/trees/challenges" element={<TreeChallenges />} />
        <Route path="/trees/challenges/max-depth" element={<MaxDepth />} />
        <Route path="/trees/challenges/invert" element={<InvertTree />} />
        <Route path="/trees/challenges/symmetric" element={<SymmetricTree />} />

        {/* Graphs */}
        <Route path="/graphs" element={<GraphMenu />} />
        <Route path="/graphs/basics" element={<GraphBasics />} />
        <Route path="/graphs/operations" element={<GraphOperations />} />
        <Route path="/graphs/operations/bfs" element={<GraphBFS />} />
        <Route path="/graphs/operations/dfs" element={<GraphDFS />} />
        <Route path="/graphs/challenges" element={<GraphChallenges />} />
        <Route path="/graphs/challenges/find-path" element={<FindPath />} />
        <Route path="/graphs/challenges/num-islands" element={<NumIslands />} />
        <Route path="/graphs/challenges/clone-graph" element={<CloneGraph />} />

        {/* Math & Logical Problems */}
        <Route path="/arrays/logical" element={<MathLogicalMenu />} />

        {/* 2D Arrays */}
        <Route path="/arrays/2d-arrays" element={<TwoDArrayMenu />} />
        <Route path="/arrays/2d/traversal" element={<MatrixTraversal />} />
        <Route path="/arrays/2d/wave-print" element={<WavePrint />} />
        <Route path="/arrays/2d/spiral" element={<SpiralMatrix />} />
        <Route path="/arrays/2d/transpose" element={<TransposeMatrix />} />
        <Route path="/arrays/2d/rotate-90" element={<RotateMatrix90 />} />
        <Route path="/arrays/2d/search-1" element={<SearchMatrix1 />} />
        <Route path="/arrays/2d/search-2" element={<SearchMatrix2 />} />

        <Route path="/arrays/logical/check-prime" element={<CheckPrime />} />

        {/* New Batch */}
        <Route
          path="/arrays/logical/second-largest"
          element={<SecondLargest />}
        />
        <Route path="/arrays/logical/rotate-array" element={<RotateArrayK />} />
        <Route
          path="/arrays/logical/remove-duplicates-sorted"
          element={<RemoveDuplicatesSorted />}
        />
        <Route path="/arrays/logical/kadane" element={<Kadane />} />
        <Route
          path="/arrays/logical/search-rotated"
          element={<SearchRotated />}
        />
        <Route path="/arrays/logical/two-sum" element={<TwoSum />} />

        {/* Batch 2 */}
        <Route
          path="/arrays/logical/majority-n2"
          element={<MajorityElementN2 />}
        />
        <Route
          path="/arrays/logical/binary-search"
          element={<LogicalBinarySearch />}
        />
        <Route
          path="/arrays/logical/merge-sorted"
          element={<MergeSortedArrays />}
        />
        <Route
          path="/arrays/logical/missing-number"
          element={<MissingNumber />}
        />
        <Route
          path="/arrays/logical/intersection"
          element={<IntersectionArrays />}
        />

        {/* Batch 3 */}
        <Route
          path="/arrays/logical/container-water"
          element={<ContainerMostWater />}
        />
        <Route
          path="/arrays/logical/trapping-rain"
          element={<TrappingRainWater />}
        />
        <Route
          path="/arrays/logical/majority-n3"
          element={<MajorityElementN3 />}
        />
        <Route path="/arrays/logical/union" element={<UnionArrays />} />

        {/* Batch 4 */}
        <Route
          path="/arrays/logical/longest-subarray-zero"
          element={<LongestSubarrayZero />}
        />
        <Route
          path="/arrays/logical/first-last-occurrence"
          element={<FirstLastOccurrence />}
        />
        <Route
          path="/arrays/logical/first-non-repeating"
          element={<FirstNonRepeating />}
        />
        <Route
          path="/arrays/logical/odd-occurrence"
          element={<OddOccurrence />}
        />

        {/* Batch 5 */}
        <Route path="/arrays/logical/three-sum" element={<ThreeSum />} />
        <Route
          path="/arrays/logical/count-subarray-less-k"
          element={<CountSubarrayLessK />}
        />
        <Route
          path="/arrays/logical/reverse-number"
          element={<ReverseNumber />}
        />
        <Route
          path="/arrays/logical/palindrome-number"
          element={<PalindromeNumber />}
        />
        <Route path="/arrays/logical/armstrong" element={<ArmstrongNumber />} />

        {/* Batch 6 - Final */}
        <Route path="/arrays/logical/count-digits" element={<CountDigits />} />
        <Route path="/arrays/logical/sum-digits" element={<SumDigits />} />
        <Route path="/arrays/logical/power-of-2" element={<PowerOfTwo />} />
        <Route path="/arrays/logical/power-of-3" element={<PowerOf3 />} />
        <Route
          path="/arrays/logical/binary-to-decimal"
          element={<BinaryToDecimal />}
        />
        <Route
          path="/arrays/logical/decimal-to-binary"
          element={<DecimalToBinary />}
        />
        <Route
          path="/arrays/logical/duplicate-xor"
          element={<DuplicateXOR />}
        />
        <Route path="/arrays/logical/lcm" element={<LCM />} />
        <Route
          path="/arrays/logical/check-coprime"
          element={<CheckCoPrime />}
        />
        <Route path="/arrays/logical/power" element={<PowerVisualizer />} />

        {/* Task 1 Missing Problems */}
        <Route
          path="/arrays/logical/remove-duplicates-unsorted"
          element={<RemoveDuplicatesUnsorted />}
        />
        <Route
          path="/arrays/logical/duplicate-number"
          element={<DuplicateNumber />}
        />
        <Route
          path="/arrays/logical/missing-repeating"
          element={<MissingRepeating />}
        />

        <Route
          path="/arrays/logical/trailing-zeros"
          element={<TrailingZeros />}
        />
        <Route path="/arrays/logical/clock-angle" element={<ClockAngle />} />
        <Route
          path="/arrays/logical/speed-time"
          element={<SpeedTimeDistance />}
        />

        <Route path="/arrays/logical/gcd" element={<GCD />} />
        <Route path="/arrays/logical/sieve" element={<Sieve />} />
        <Route path="/arrays/logical/check-sorted" element={<CheckSorted />} />

        {/* Reusing existing components for Logical Menu */}
        <Route path="/arrays/logical/max-min" element={<FindMaxMin />} />
        <Route
          path="/arrays/logical/reverse-array"
          element={<ReverseArray />}
        />
        <Route
          path="/arrays/logical/subarray-sum-k"
          element={<SubarraySum />}
        />
        <Route path="/arrays/logical/frequency" element={<CountFrequency />} />

        {/* Pointers */}
        <Route path="/pointers" element={<PointerMenu />} />
        <Route path="/pointers/basics" element={<PointerBasics />} />
        <Route path="/pointers/double" element={<DoublePointers />} />
        <Route path="/pointers/functions" element={<PointerFunctions />} />
        <Route path="/pointers/practice" element={<PointerPractice />} />
      </Routes>
    </Router>
  );
}

export default App;
