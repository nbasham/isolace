package com.isolace.common;

import java.util.Random;

public class ArrayUtil
{
    final public static boolean contains(final int[] a, final int candidate) {
        return contains(a, a.length, candidate);
    }
    
    final public static int[] removeDuplicates(final int[] a) {
        if(a.length < 2) {
            return a;
        }
        int numDups = 0;
        for (int i = 0; i < a.length - 1; i++) {
            if(a[i] == a[i+1]) {
                numDups++;
            }
        }
        if(numDups == 0) {
            return a;
        } else {
            int newSize = a.length - numDups;
            int[] aa = new int[newSize];
            int index = 0;
            for (int i = 0; i < a.length - 1; i++) {
                if(a[i] != a[i+1]) {
                    aa[index] = a[i];
                    index++;
                }
            }
            aa[index] = a[a.length-1];
            
            return aa;
        }
    }
    
	/**
	 * Given an int array does it already contains the candidate value. Not a
	 * generalized approach because this routine doesn't assume that the array
	 * is full and thus passes in numItems instead of using the arrays length;
	 */
	final private static boolean contains(final int[] a, final int numItems, final int candidate)
	{
		for(int i = 0; i < numItems; i++)
		{
			if(candidate == a[i])
				return true;
		}
		return false;
	}

	/**
	 * Creates an array of unique values e.g. if min = 0, max = 10 and count = 4 it might return 0, 4, 7, 10
	 * 
	 * note these values are not sorted, use Arrays.sort(array)
	 */
	final public static int[] createArrayWithUniqueValues(final int min, final int max, final int count)
	{

		int numFulfilled = 0;
		int[] fulfilled = new int[count];
		Random r = new Random();
		while (numFulfilled < count)
		{
			int candidate = r.nextInt(max) + min;
			if (!ArrayUtil.contains(fulfilled, numFulfilled, candidate))
			{
				fulfilled[numFulfilled] = candidate;
				numFulfilled++;
			}
		}
		// Arrays.sort(fulfilled);
		//ArrayUtil.printArray(fulfilled);

		return fulfilled;
	}

	/**
	 * Creates an array of unique values e.g. if min = 0, max = 4 it would
	 * return 0, 1, 2, 3, 4
	 * 
	 * note these values are not sorted, use Arrays.sort(array)
	 */
	final public static int[] createAndFillArrayWithUniqueValues(final int min, final int max)
    {
		int count = max - min + 1;
		return ArrayUtil.createArrayWithUniqueValues(min, max, count);
    	
    }

	final public static void printArray(int[] a)
	{
		 System.out.println(ArrayUtil.toString(a));
	}

	final public static String toString(int[] a)
	{
		StringBuilder sb = new StringBuilder();
		 for(int f = 0; f < a.length; f++)
		 {
			 sb.append(a[f] + ", ");
		 }
		 return sb.toString();
	}
}
